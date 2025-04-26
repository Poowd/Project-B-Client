"use client";
import Link from "next/link";
import Layout_1 from "../components/Layout_1";
import Navbar from "../components/package/Navbar";
import Content_1 from "../components/Content_1";
import foodguy05 from "../app/assets/images/foodguy05.png";
import Image from "next/image";
import Card1 from "../components/single/card/Card1";
import { MdOutlinePets } from "react-icons/md";
import { FaHammer } from "react-icons/fa6";
import { CopyToClipboard } from "../hooks/functions/CopyToClipboard";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import {
  CloseButton,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { LuHammer } from "react-icons/lu";

export default function Page() {
  return (
    <Layout_1>
      <main className="h-screen flex flex-col gap-5 overflow-y-auto">
        <section className="min-h-16 h-16 max-h-32">
          <Navbar></Navbar>
        </section>
        <section className="flex justify-center">
          <Content_1>
            <main className="w-full mt-5">
              <main className="border border-neutral-800 bg-neutral-900 rounded w-full flex flex-col lg:flex-row items-center text-center lg:text-start">
                <section className="flex-1 p-10">
                  <h1 className="text-4xl text-cyan-600">
                    Welcome to Archetopia
                  </h1>
                  <p className="text-neutral-500 mb-10">
                    Navigate to different contents and guides available here at
                    Archetopia.
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
            <hr className="my-10 text-neutral-800 w-full" />
            <main className="h-fit mb-20">
              <section className="text-center mb-5">
                <h1 className="text-5xl font-bold text-cyan-600 mb-5">
                  Archetopia
                </h1>
                <p className="text-neutral-500 text-lg">
                  Archetopia is one of the realms of Philippine Minecraft
                  Server, Cyan Realms. As the Guardians embark on lengthly
                  journey across the realms, the Archetypes, seeker of knowledge
                  and information distribution, will provide assistance in
                  creating archives of what is discovered.
                </p>
              </section>
              <section className="text-center">
                <Popover>
                  <PopoverButton
                    onClick={() => CopyToClipboard("play.cyanrealms.com")}
                  >
                    <p>play.cyanrealms.com</p>
                  </PopoverButton>
                  <PopoverPanel
                    className={
                      "fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-black/75"
                    }
                  >
                    <main className="bg-neutral-900 w-3/12 h-4/12 rounded scale-up-center flex flex-col justify-center items-center gap-10">
                      <section className="flex flex-col justify-center items-center">
                        <h1 className="text-8xl mb-3 text-green-500 drop-shadow-lg drop-shadow-green-400 animate-pulse">
                          <IoIosCheckmarkCircleOutline />
                        </h1>
                        <h1 className="text-2xl">Copied to Clipboard</h1>
                      </section>
                      <section>
                        <CloseButton
                          className={
                            "bg-red-600 py-2 px-4 rounded-full hover:bg-red-700 "
                          }
                        >
                          Continue
                        </CloseButton>
                      </section>
                    </main>
                  </PopoverPanel>
                </Popover>
              </section>
            </main>
            <main className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <Card1 icon={<MdOutlinePets />}>Pets</Card1>
              <Card1 icon={<LuHammer />}>BuildComp</Card1>
            </main>
          </Content_1>
        </section>
      </main>
    </Layout_1>
  );
}
