export default function MissingInfoAlert({ items }: { items: string[] }) {
  if (items.length === 0) return null;

  return (
    <section className="rounded-lg border border-clay/30 bg-clay/10 p-4 text-sm text-ink shadow-soft">
      <h2 className="font-semibold text-ink">Information Missing Alert</h2>
      <p className="mt-1 text-ink/70">
        Before completing this section, make sure you have reviewed:
      </p>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="rounded-md bg-white px-3 py-2">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
