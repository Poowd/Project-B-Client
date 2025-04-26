export default function DashboardContent({ cards, children }) {
  return (
    <main className="h-full w-full flex flex-col pe-5 pt-5 lg:pt-0">
      <header className="flex-none h-fit w-full mb-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards}
      </header>
      <section className="flex-1 w-full h-fit flex flex-col md:flex-row gap-5">
        {children}
      </section>
    </main>
  );
}
