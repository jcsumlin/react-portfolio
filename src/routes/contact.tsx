import ContactMe from '@/components/ContactMe';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/contact')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="mt-8">
      <header>
        <h1
          id="contact-heading"
          className="text-4xl font-extrabold mb-2"
          tabIndex={-1}
        >
          Contact Me
        </h1>
        <p className="text-lg mb-4">
          I'd love to hear from you! Whether you have a question, a project
          idea, or just want to say hello, feel free to reach out using the form
          below.
        </p>
      </header>
      <ContactMe />
      <footer
        className="mt-6 text-sm text-gray-500 text-center"
        aria-live="polite"
      >
        Your information is kept private and secure.
      </footer>
    </div>
  );
}
