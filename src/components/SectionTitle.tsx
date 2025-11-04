type Props = {
  title: string;
};

export default function SectionTitle({ title }: Props) {
  return (
    <span className="flex">
      <h2 className="text-4xl font-bold mb-4">{title}</h2>
      <hr className="flex-grow border-t border-secondary-foreground mt-6 ml-4" />
    </span>
  );
}
