export default function DevspotCubiodsContent({ search, buttons, children }) {
  return (
    <main className="h-full flex flex-col pe-5 pt-5 lg:pt-0">
      <header className="flex-none h-fit w-full mb-5 flex items-center justify-end gap-3">
        <section className={`flex-none flex flex-row-reverse gap-2`}>
          {buttons}
        </section>
        <section className="flex-none">{search}</section>
      </header>

      <section className="flex-1 w-full h-fit">
        {children}
      </section>
    </main>
  );
}
