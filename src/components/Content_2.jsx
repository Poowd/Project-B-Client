export default function Content_2({ sidebar, children }) {
  return (
    <main className={`h-full w-full flex`}>
      <section className={`flex-none bg-neutral-950 text-white shadow`}>{sidebar}</section>
      <section className="flex-1 bg-neutral-900 text-white">{children}</section>
    </main>
  );
}
