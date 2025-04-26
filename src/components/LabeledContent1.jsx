export default function LabeledContent1({ label, children }) {
  return (
    <section>
      <h3 className="mb-3">{label}</h3>
      <div>{children}</div>
    </section>
  );
}
