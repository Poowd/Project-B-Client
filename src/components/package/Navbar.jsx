import Link from "next/link";
import RedirectButton from "../single/button/RedirectButton";

export default function Navbar() {
  return (
    <main
      className={`h-full flex justify-between items-center bg-linear-to-r from-cyan-500 to-blue-500 shadow px-10 md:px-10 lg:px-20 xl:px-40 text-white`}
    >
      <section>
        <RedirectButton path={"/"}>
          <h1 className="text-3xl font-extrabold">Archetopia</h1>
        </RedirectButton>
      </section>
      <section>
        <main className="flex gap-5">
          <section>
            <ul className="flex gap-3">
              <li>
                <RedirectButton path={"https://cyanrealms.com"} newPage={true}>
                  Cyan Realms
                </RedirectButton>
              </li>
            </ul>
          </section>
          <section></section>
        </main>
      </section>
    </main>
  );
}
