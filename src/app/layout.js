import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Wikitopia",
  description: "Wiki for Cyan Realms Developed by Powd_.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css?family=Poppins"
          rel="stylesheet"
        />
      </head>
      <body className="bg-neutral-950 text-neutral-50 scroll-smooth">
        <main>
          <nav className="h-16 w-full bg-linear-to-r from-cyan-500 to-blue-500">
            <section className="w-[90%] lg:w-[68%] mx-auto h-full flex justify-between items-center">
              <div>
                <h1 className="text-2xl">Wikitopia</h1>
              </div>
              <div className="flex gap-3">
                <Link href={"/"}>
                  <p>Home</p>
                </Link>
                <Link href={"/guides"}>
                  <p>Guides</p>
                </Link>
              </div>
              <div>
                <Link href={"https://cyanrealms.com"} target="_blank">
                  <p>Cyan Realms</p>
                </Link>
              </div>
            </section>
          </nav>
          <section className="max-w-[2400px] w-full min-h-[65vh] h-fit mx-auto">
            {children}
          </section>
          <footer className="w-full bg-cyan-700 text-[#fff] py-20">
            <div className="h-full w-[90%] lg:w-[68%] mx-auto">
              <div className="h-fit w-full flex flex-col lg:flex-row gap-10">
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold mb-2.5">Wikitopia</h2>
                  <p>
                    As the Guardians embark on lengthly journey across the
                    realms, the Archetypes, seeker of knowledge and information
                    distribution, will provide assistance in creating archives
                    of what is discovered.
                  </p>
                </div>
                <div className="flex-1 lg:text-end">
                  <h2 className="text-2xl font-semibold mb-2.5">Navigate</h2>
                  <ul className="flex flex-col gap-2.5">
                    <li className="hover:cursor-pointer">Home</li>
                  </ul>
                </div>
                <div className="flex-1 lg:text-end">
                  <h2 className="text-2xl font-semibold mb-2.5">Others</h2>
                  <ul className="flex flex-col gap-2.5">
                    <li className="hover:cursor-pointer">
                      Philippine Minecraft Server
                    </li>
                    <li className="hover:cursor-pointer">Java Edition</li>
                  </ul>
                </div>
              </div>
              <div className="h-fit w-full py-10">
                <div>
                  <hr className="my-5" />
                </div>
                <div className="lg:text-center">
                  <p>Powd_ | Wikitopia | All Rights Reserved &copy; 2025</p>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </body>
    </html>
  );
}
