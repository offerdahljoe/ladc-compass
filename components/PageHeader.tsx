type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export default function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className="mb-6">
      {eyebrow ? (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-lagoon">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-semibold text-ink sm:text-4xl">{title}</h2>
      <p className="mt-3 max-w-3xl text-base leading-7 text-ink/75">
        {description}
      </p>
    </div>
  );
}
