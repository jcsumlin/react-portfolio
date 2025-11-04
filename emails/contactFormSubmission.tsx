import { Heading } from "@react-email/components";
import Template from "./template";

export default function ContactFormSubmission({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  return (
    <Template>
      <Heading as="h1">New Contact Form Submission</Heading>
      <p>You have received a new message from your contact form.</p>
      <ul>
        <li>
          <strong>Name:</strong> {name}
        </li>
        <li>
          <strong>Email:</strong> {email}
        </li>
      </ul>
      <p>Message:</p>
      <p>{message}</p>
    </Template>
  );
}
