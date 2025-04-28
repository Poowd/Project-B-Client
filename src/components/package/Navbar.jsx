import Link from "next/link";
import RedirectButton from "../single/button/RedirectButton";
import MobileViewNavbar from "../single/modal/MobileViewNavbar";
import RegularButton from "../single/button/RegularButton";
import NavbarRegularButton from "../single/button/NavbarRegularButton";
import { FiMenu } from "react-icons/fi";

export default function Navbar() {
  return (
    <main
      className={`h-full flex justify-between items-center bg-linear-to-r from-cyan-500 to-blue-500 shadow px-5 md:px-10 lg:px-20 xl:px-40 text-white`}
    >
      <section>
        <RedirectButton path={"/"}>
          <h1 className="text-3xl font-extrabold">Wikitopia</h1>
        </RedirectButton>
      </section>
      <section>
        <main className="flex gap-5">
          <section className="flex lg:hidden gap-5">
            <MobileViewNavbar
              button={
                <NavbarRegularButton>
                  <FiMenu />
                </NavbarRegularButton>
              }
            >
              <ul className="flex gap-3">
                <li className="border w-full text-center rounded border-neutral-800 bg-neutral-900 py-3">
                  <RedirectButton
                    path={"https://cyanrealms.com"}
                    newPage={true}
                  >
                    Cyan Realms
                  </RedirectButton>
                </li>
              </ul>
            </MobileViewNavbar>
          </section>
          <section className="hidden lg:flex gap-5">
            <ul className="flex gap-3">
              <li>
                <RedirectButton path={"https://cyanrealms.com"} newPage={true}>
                  Cyan Realms
                </RedirectButton>
              </li>
            </ul>
          </section>
        </main>
      </section>
    </main>
  );
}
