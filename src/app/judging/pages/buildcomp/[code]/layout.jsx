export default function Layout({ children }) {
  return (
    <main className="flex justify-center">
      <section className="text-center lg:text-start px-5 lg:px-0 md:w-4/6">
        {children}
      </section>
    </main>
  );
}
