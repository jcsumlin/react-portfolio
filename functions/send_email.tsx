import type { Config, Context } from "@netlify/functions";
import { Resend } from 'resend';
import ThankYouEmail from "../emails/thankyou";
import { formSchema } from "../src/schemas/contactMe";
import ContactFormSubmission from "../emails/contactFormSubmission";

const apiKey = Netlify.env.get("RESEND_API_KEY");

async function sendThankYouEmail(data: { name: string; email: string }) {
    const { name, email } = data;
    const resend = new Resend(apiKey);
    await resend.emails.send({
        from: 'No Reply <no-reply@chatsumlin.com>',
        to: [email],
        subject: 'Thanks for contacting me!',
        react: <ThankYouEmail name={name} />,
    });
}

async function sendContactNotificationEmail(data: { name: string; email: string; message: string }) {
    const resend = new Resend(apiKey);
    await resend.emails.send({
        from: 'No Reply <no-reply@chatsumlin.com>',
        to: ['chat@chatsumlin.com'],
        subject: 'New Contact Message',
        react: <ContactFormSubmission name={data.name} email={data.email} message={data.message} />,
    });
}


export default async (request: Request, context: Context) => {
    try {
        const data = await request.json();
        const parsedData = formSchema.safeParse(data);
        if (!parsedData.success) {
            return Response.json({ error: 'Invalid form data', details: parsedData.error }, { status: 400 });
        }
        if (data.organization) {
            return Response.json({ message: 'Bot detected' }, { status: 200 });
        }

        await sendThankYouEmail(data);
        await sendContactNotificationEmail(data);

        return Response.json({ message: "Let's become serverless conductors!!!" });
    } catch (error) {
        console.log(error);
        return Response.json({ error: 'Failed sending email' }, { status: 500 });
    }
};

export const config: Config = {
    path: "/api/contact"
};