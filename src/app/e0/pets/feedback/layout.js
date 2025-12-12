import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function Layout({ children }) {
  const headerlinks = [
    { name: "Go Back", href: "./", icon: <IoMdArrowRoundBack /> },
    { name: "|", href: "", icon: null },
    { name: "Browse Pets", href: "./browse", icon: null },
    { name: "|", href: "", icon: null },
    { name: "Create Pets", href: "./creator", icon: null },
  ];
  return (
    <main className="size-full">
      <section className="hidden md:block mt-5 px-10">
        <ul className="flex items-center gap-2.5">
          {headerlinks.map((item, index) =>
            index % 2 === 0 ? (
              <li key={index}>
                <Link href={item.href}>
                  <div className="flex items-center gap-2 text-sm text-neutral-400 hover:underline hover:cursor-pointer">
                    {item.icon && item.icon} <span>{item.name}</span>
                  </div>
                </Link>
              </li>
            ) : (
              <li key={index} className="text-neutral-400">
                <span>{item.name}</span>
              </li>
            )
          )}
        </ul>
      </section>
      <section>{children}</section>
    </main>
  );
}
