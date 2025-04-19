import Link from "next/link";

export default function Page() {
  return (
    <main className="h-screen w-screen flex flex-col justify-center items-center gap-3">
      <section className="text-4xl">welcome to archetopia</section>
      <section>
        <Link
          href={"/pages/"}
          className="py-2 px-5 border border-neutral-300 rounded bg-red-400 text-white"
        >
          Hompage
        </Link>
      </section>
    </main>
  );
}
