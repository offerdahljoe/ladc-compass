export default function ClinicalConnectionMap({ items }: { items: string[] }) {
  return (
    <section className="rounded-lg border border-lagoon/20 bg-white p-4 shadow-soft">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-lagoon">
        Clinical Connection Map
      </h2>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
        {items.map((item, index) => (
          <div key={item} className="flex items-center gap-2">
            <span className="rounded-md border border-ink/10 bg-paper px-3 py-2 font-medium text-ink">
              {item}
            </span>
            {index < items.length - 1 ? (
              <span className="text-lagoon">-&gt;</span>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
