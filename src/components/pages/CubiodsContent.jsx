export default function CubiodsContent({ search, buttons, children }) {
  return (
    <main>
      <header className="w-full h-fit bg-white border border-neutral-300 rounded-full p-2 mb-5 flex items-center gap-2">
        <section className="flex-1">{search}</section>
        <section className="flex-none flex flex-row-reverse gap-2">
          {buttons}
        </section>
      </header>

      <section className="w-full mb-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {children}
      </section>
    </main>
  );
}
