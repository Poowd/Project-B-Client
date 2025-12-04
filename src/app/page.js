"use client";

import { CopyToClipboard } from "../hooks/functions/CopyToClipboard";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import {
  CloseButton,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import cyan_logo from "./assets/images/Icontext.png";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <main className="w-full h-full">
      <header className="h-fit lg:h-[75vh] lg:max-h-[75rem] w-full bg-[url(https://wallpapercrafter.com/desktop/154149-simple-Firewatch-fantasy-art-cyan.jpg)] bg-center">
        <section className="w-full h-full animated-background bg-gradient-to-r from-blue-500/50 via-blue-300/50 to-cyan-500/50 backdrop-blur-xs py-10 relative">
          <div className="absolute bottom-0 left-0 w-full h-[100%] bg-gradient-to-b from-transparent via-neutral-950/25 to-neutral-950">
            <div className="w-full h-full flex justify-center items-center mb-20">
              <div className="flex flex-col items-center">
                <figure className="mb-5">
                  <Image
                    src={cyan_logo}
                    height={150}
                    width={150}
                    alt="cyan realms logo"
                  ></Image>
                </figure>
                <div className="w-full flex flex-col items-center mb-10">
                  <h1 className="text-4xl lg:text-8xl font-bold uppercase">
                    Wikitopia
                  </h1>
                  <p className="w-10/12 lg:w-2/6 text-center">
                    Wikitopia is one of the realms of Philippine Minecraft
                    Server, Cyan Realms. As the Guardians embark on lengthly
                    journey across the realms, the Archetypes, seeker of
                    knowledge and information distribution, will provide
                    assistance in creating archives of what is discovered.
                  </p>
                </div>
                <div>
                  <Link href={"/v0"}>
                    <div className="py-2 px-4 border border-cyan-500 shadow-xl bg-cyan-900 hover:bg-cyan-950 rounded-full hover:cursor-pointer">
                      <p>Explore Now!</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </header>
      <div className="w-[90%] lg:w-[68%] mx-auto py-20">
        Contents will be adde soon!
      </div>
    </main>
  );
}
