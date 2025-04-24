import Link from "next/link";

export default function Navbar() {
  return (
    <main
      className={`h-16 flex justify-between items-center bg-cyan-600 shadow px-10 md:px-10 lg:px-20 xl:px-40 text-white`}
    >
      <section>
        <h1 className="text-2xl font-bold">Archetopia</h1>
      </section>
      <section>
        <main className="flex gap-5">
          <section>
            <ul className="flex gap-3">
              <li>Guide</li>
              <li>
                <Link href={"https://cyanrealms.com"} target="_blank">
                  Cyan Realms
                </Link>
              </li>
            </ul>
          </section>
          <section></section>
        </main>
      </section>
    </main>
  );
}
