import Link from "next/link";
import Layout_1 from "../components/Layout_1";
import Navbar from "../components/package/Navbar";
import Content_1 from "../components/Content_1";
import foodguy05 from "../app/assets/images/foodguy05.png";
import Image from "next/image";
import Card1 from "../components/single/card/Card1";
import { MdOutlinePets } from "react-icons/md";
import { FaHammer } from "react-icons/fa6";

export default function Page() {
  return (
    <Layout_1>
      <main className="h-screen flex flex-col gap-5">
        <section className="h-16">
          <Navbar></Navbar>
        </section>
        <section className="flex justify-center">
          <Content_1>
            <main className="w-full mt-5">
              <main className="border border-neutral-800 bg-neutral-900 rounded w-full flex flex-col lg:flex-row items-center lg:items-end text-center lg:text-start">
                <section className="flex-1 p-10">
                  <h1 className="text-4xl text-cyan-600">
                    Welcome to Archetopia
                  </h1>
                  <p className="text-neutral-500 mb-10">
                    Navigate to different contents and guides available here at
                    Archetopia. The primary purpose of this website is to
                    showcase the pets known as 'Cubiods' along with their unique
                    stories prompt to fit with the main lore of Cyan Realms.
                  </p>
                  <Link
                    href={"/pages/"}
                    className="py-4 px-6 rounded bg-linear-65 hover:bg-linear-180 from-cyan-600 to-cyan-700 hover:shadow hover:border hover:border-cyan-300 hover:shadow-cyan-400 text-white delay-100 duration-200 ease-in-out"
                  >
                    Start your Journey!
                  </Link>
                </section>
                <section className="flex-none">
                  <figure>
                    <Image
                      src={foodguy05}
                      alt="..."
                      className="size-58"
                    ></Image>
                  </figure>
                </section>
              </main>
            </main>
            <hr className="my-10 text-neutral-300 w-full" />
            <main className="w-full grid grid-cols-3 gap-3">
              <Card1 icon={<MdOutlinePets />}>Pets</Card1>
              <Card1 icon={<FaHammer />}>BuildComp</Card1>
            </main>
          </Content_1>
        </section>
      </main>
    </Layout_1>
  );
}
