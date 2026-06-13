"use client";

type FieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  type?: "text" | "date" | "number" | "textarea" | "select";
  options?: string[];
  placeholder?: string;
};

export default function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  options = [],
  placeholder,
}: FieldProps) {
  const base =
    "focus-ring mt-1 w-full rounded-md border border-ink/15 bg-white px-3 py-2 text-sm text-ink placeholder:text-ink/40";

  return (
    <label className="block text-sm font-medium text-ink">
      {label}
      {type === "textarea" ? (
        <textarea
          className={base}
          name={name}
          value={value}
          onChange={(event) => onChange(name, event.target.value)}
          placeholder={placeholder}
        />
      ) : type === "select" ? (
        <select
          className={base}
          name={name}
          value={value}
          onChange={(event) => onChange(name, event.target.value)}
        >
          <option value="">Choose one</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          className={base}
          name={name}
          type={type}
          value={value}
          onChange={(event) => onChange(name, event.target.value)}
          placeholder={placeholder}
          min={type === "number" ? "0" : undefined}
          step={type === "number" ? "0.25" : undefined}
        />
      )}
    </label>
  );
}
