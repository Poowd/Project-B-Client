import Link from "next/link";
import { sidebarItems } from "./paths";

export default function Layout({ children }) {
  return (
    <main className="w-full min-h-[100vh] bg-neutral-900 text-neutral-100 select-none relative">
      <section className="size-full scroll-smooth flex flex-col lg:flex-row relative">
        <div className="hidden lg:flex flex-none min-h-[100vh] w-[300px] bg-neutral-950/50 text-neutral-400 relative">
          <div className="sticky top-0 h-[100vh] w-full flex flex-col justify-between p-5">
            <div>
              <h1 className="border-neutral-800 border-b pb-2 mb-4">
                Wikitopia
              </h1>
              <ul className="flex flex-col gap-1">
                {sidebarItems.map((item, index) => (
                  <Link href={item.href} key={index}>
                    <li className="p-2.5 rounded hover:bg-neutral-950/50 hover:cursor-pointer flex gap-2.5 items-center">
                      <span>{item.name}</span>
                      <span className="text-xs">
                        {item.plugin && "[" + item.plugin + "]"}
                      </span>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
            <div>
              <ul className="flex flex-col-reverse gap-1">
                <li className="p-2.5 rounded hover:bg-neutral-950/50 hover:cursor-pointer">
                  Item 1
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex-1">{children}</div>
      </section>
    </main>
  );
}
