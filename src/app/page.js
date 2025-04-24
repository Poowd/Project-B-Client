import Link from "next/link";
import Layout_1 from "../components/Layout_1";
import Navbar from "../components/package/Navbar";
import Content_1 from "../components/Content_1";

export default function Page() {
  return (
    <Layout_1>
      <main className="h-screen flex flex-col gap-5">
        <section>
          <Navbar></Navbar>
        </section>

        <section className="flex justify-center">
          <Content_1>
            <main className="w-full mt-5">
              <main className="p-10 border border-neutral-300 rounded w-full">
                <section className="mb-10">
                  <h1 className="text-4xl text-cyan-600">Welcome to Archetopia</h1>
                  <p className="text-neutral-500">
                    Navigate to different contents and guides available here at
                    Archetopia. The primary purpose of this website is to
                    showcase the pets known as 'Cubiods' along with their unique
                    stories prompt to fit with the main lore of Cyan Realms.
                  </p>
                </section>
                <section>
                  <Link
                    href={"/pages/"}
                    className="py-2 px-5 border border-neutral-300 rounded bg-cyan-600 hover:bg-cyan-800 text-white"
                  >
                    Start your Journey!
                  </Link>
                </section>
              </main>
            </main>
          </Content_1>
        </section>
      </main>
    </Layout_1>
  );
}
