import { FiMenu } from "react-icons/fi";
import MobileViewNavbar from "../single/modal/MobileViewNavbar";
import TableButton from "../single/button/TableButton";

export default function BuildCompContent({ search, buttons, children }) {
  return (
    <main className="h-full flex flex-col pe-5 pt-5 lg:pt-0">
      <header className="flex-none h-fit w-full mb-5 hidden lg:flex items-center justify-end gap-3">
        <section className={`flex-none flex flex-row-reverse gap-2`}>
          {buttons}
        </section>
        <section className="flex-none">{search}</section>
      </header>

      <header className="lg:flex-none w-full mb-5 lg:hidden flex items-center justify-end gap-3">
        <section className="flex-1 text-center">{search}</section>
        <MobileViewNavbar
          button={
            <TableButton>
              <FiMenu />
            </TableButton>
          }
        >
          <section className={`flex-none flex flex-col gap-2`}>
            {buttons}
          </section>
        </MobileViewNavbar>
      </header>

      <section className="flex-1 w-full h-fit grid grid-cols-1 lg:grid-cols-2 content-start gap-5">
        {children}
      </section>
    </main>
  );
}
