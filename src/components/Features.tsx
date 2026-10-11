import type { Feature, Status } from "@/content/projects";

const label: Record<Status, string> = {
  built: "Built",
  "in-progress": "In progress",
  planned: "Planned",
};

/** Feature list where shipped and planned work are visibly different, in text and not only colour. */
export function Features({ items }: { items: Feature[] }) {
  return (
    <ul className="features">
      {items.map((f) => (
        <li key={f.label} data-status={f.status}>
          <span className={`mark mark-${f.status}`} aria-hidden="true" />
          <span>{f.label}</span>
          <span className="state">{label[f.status]}</span>
        </li>
      ))}
    </ul>
  );
}
