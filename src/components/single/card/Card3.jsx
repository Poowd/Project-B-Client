export default function Card3({ data, children }) {
  return (
    <main className="h-40 border border-neutral-800 bg-neutral-900 rounded p-5 text-center flex flex-col justify-center gap-3">
      <h3 className="text-lg">{children}</h3>
      <h1 className="text-5xl font-bold text-cyan-600">{data}</h1>
    </main>
  );
}
