import { Resend } from "resend";
import ThankYouEmail from "../emails/thankyou";
import { formSchema } from "../src/schemas/contactMe";
import ContactFormSubmission from "../emails/contactFormSubmission";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendThankYouEmail(data: { name: string; email: string }) {
  const { name, email } = data;
  await resend.emails.send({
    from: "No Reply <send@chatsumlin.com>",
    to: [email],
    subject: "Thanks for contacting me!",
    react: <ThankYouEmail name={name} />,
  });
}

export async function sendContactNotificationEmail(data: {
  name: string;
  email: string;
  message: string;
}) {
  await resend.emails.send({
    from: "No Reply <send@chatsumlin.com>",
    to: ["chat@chatsumlin.com"],
    subject: "New Contact Message",
    react: (
      <ContactFormSubmission
        name={data.name}
        email={data.email}
        message={data.message}
      />
    ),
  });
}

export function validatePayload(data: any) {
  const parsedData = formSchema.safeParse(data);
  return parsedData;
}
