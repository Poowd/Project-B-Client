export default function CubiodsContent({ search, buttons, children }) {
  return (
    <main className="h-full flex flex-col pe-5 pt-5 lg:pt-0">
      <header className="flex-none h-fit w-full mb-5 flex items-center justify-end gap-3">
        <section className={`flex-none flex flex-row-reverse gap-2`}>
          {buttons}
        </section>
        <section className="flex-none">{search}</section>
      </header>

      <section className="flex-1 w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 content-start gap-5">
        {children}
      </section>
    </main>
  );
}
