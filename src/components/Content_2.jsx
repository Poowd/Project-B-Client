export default function Content_2({ sidebar, children }) {
  return (
    <main className={`flex`}>
      <section className={`flex-none bg-neutral-950 text-white lg:rounded`}>
        {sidebar}
      </section>
      <section className="flex-1 bg-green-600 h-full overflow-y-auto">
        {children}
      </section>
    </main>
  );
}
