export default function Loading() {
  return (
    <main className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-white z-50">
      <section className="flex flex-col gap-5 justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-400"></div>
        <h1 className="text-xl font-semibold">Loading...</h1>
      </section>
    </main>
  );
}
