import ContactMe from "@/components/ContactMe";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main
      className="min-h-svh flex items-center justify-center px-4"
      aria-labelledby="contact-heading"
    >
      <section
        className="w-full max-w-2xl bg-gray-950 rounded-xl shadow-lg p-8 md:p-12 flex flex-col gap-8 border border-gray-800"
        role="region"
        aria-label="Contact form section"
      >
        <header>
          <h1
            id="contact-heading"
            className="text-4xl font-extrabold text-white mb-2"
            tabIndex={-1}
          >
            Contact Me
          </h1>
          <p className="text-lg text-gray-300 mb-4">
            I'd love to hear from you! Whether you have a question, a project
            idea, or just want to say hello, feel free to reach out using the
            form below.
          </p>
        </header>
        <ContactMe />
        <footer
          className="mt-6 text-sm text-gray-500 text-center"
          aria-live="polite"
        >
          Your information is kept private and secure.
        </footer>
      </section>
    </main>
  );
}
