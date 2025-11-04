import { Button, Heading, Img, Hr } from "@react-email/components";
import Template from "./template";

export default function ThankYouEmail({ name }: { name: string }) {
  return (
    <Template>
      <div className="bg-blue-50 p-8 rounded-xl shadow-md">
        <Heading as="h1" className="text-blue-600 mb-4 text-2xl font-bold">
          Thank You for Reaching Out!
        </Heading>
        <p className="text-lg mb-2 text-gray-900">Hi {name},</p>
        <p className="mb-4 text-gray-700">
          I truly appreciate your message and interest in my work. I'll review
          your inquiry and respond as soon as possible.
        </p>
        <Button
          href="https://chatsumlin.com"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg mt-3 inline-block"
        >
          Explore My Portfolio
        </Button>
        <Hr />
        <Img
          src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTRkMGhja2RhaGs1Z2wwbGhicnIyY3ZqeTlyNGgzbXRxeWUxMjVpeiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/mbhseRYedlG5W/giphy.gif"
          alt="You're awesome"
          className="my-4 rounded-lg mx-auto"
        />
      </div>
    </Template>
  );
}
