import { Resend } from 'resend';
import ThankYouEmail from '../emails/thankyou';
import { formSchema } from '../src/schemas/contactMe';
import ContactFormSubmission from '../emails/contactFormSubmission';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.FROM_EMAIL;
const TO_EMAIL = process.env.TO_EMAIL;

export async function sendThankYouEmail(data: { name: string; email: string }) {
  const { name, email } = data;
  if (!FROM_EMAIL) {
    throw new Error('FROM_EMAIL is not defined');
  }
  await resend.emails.send({
    from: FROM_EMAIL,
    to: [email],
    subject: 'Thanks for contacting me!',
    react: <ThankYouEmail name={name} />,
  });
}

export async function sendContactNotificationEmail(data: {
  name: string;
  email: string;
  message: string;
}) {
  if (!FROM_EMAIL) {
    throw new Error('FROM_EMAIL is not defined');
  }
  if (!TO_EMAIL) {
    throw new Error('TO_EMAIL is not defined');
  }
  await resend.emails.send({
    from: FROM_EMAIL,
    to: [TO_EMAIL],
    subject: 'New Contact Message',
    react: (
      <ContactFormSubmission
        name={data.name}
        email={data.email}
        message={data.message}
      />
    ),
  });
}

export function validatePayload(data: unknown) {
  const parsedData = formSchema.safeParse(data);
  return parsedData;
}
