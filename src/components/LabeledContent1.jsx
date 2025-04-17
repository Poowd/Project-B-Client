export default function LabeledContent1({ label, children }) {
  return (
    <section>
      <h3 className="text-xs mb-3">{label}</h3>
      <div>{children}</div>
    </section>
  );
}
