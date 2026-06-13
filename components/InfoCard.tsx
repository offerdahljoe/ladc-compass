type InfoCardProps = {
  title: string;
  children: React.ReactNode;
  accent?: "lagoon" | "sage" | "clay" | "marigold";
};

const accentMap = {
  lagoon: "border-lagoon/45",
  sage: "border-sage/45",
  clay: "border-clay/45",
  marigold: "border-marigold/55",
};

export default function InfoCard({
  title,
  children,
  accent = "lagoon",
}: InfoCardProps) {
  return (
    <article className={`rounded-lg border bg-white p-5 shadow-soft ${accentMap[accent]}`}>
      <h3 className="text-xl font-semibold text-ink">{title}</h3>
      <div className="mt-4 space-y-4 text-sm leading-6 text-ink/78">{children}</div>
    </article>
  );
}
