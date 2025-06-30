"use client";

import { CopyToClipboard } from "../hooks/functions/CopyToClipboard";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import {
  CloseButton,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";

export default function Page() {
  return (
    <main className="w-full h-full">
      <header className="h-fit lg:h-[75vh] lg:max-h-[75rem] w-full bg-[url(https://wallpapercrafter.com/desktop/154149-simple-Firewatch-fantasy-art-cyan.jpg)] bg-center">
        <section className="w-full h-full bg-neutral-950/50 backdrop-blur-xs py-10">
          <div className="w-full h-full flex justify-center items-center">
            <div className="flex flex-col items-center">
              <figure className="mb-5">
                <img
                  src={"https://cyanrealms.com/uploads/!!!finalreal.png"}
                  className="size-20 lg:size-28"
                ></img>
              </figure>
              <div className="w-full flex flex-col items-center mb-10">
                <h1 className="text-4xl lg:text-8xl font-extrabold uppercase">
                  Wikitopia
                </h1>
                <p className="w-10/12 lg:w-1/2 text-center">
                  Wikitopia is one of the realms of Philippine Minecraft Server,
                  Cyan Realms. As the Guardians embark on lengthly journey
                  across the realms, the Archetypes, seeker of knowledge and
                  information distribution, will provide assistance in creating
                  archives of what is discovered.
                </p>
              </div>
              <div>
                <Popover>
                  <PopoverButton
                    onClick={() => CopyToClipboard("play.cyanrealms.com")}
                  >
                    <div className="py-2 px-4 border border-cyan-500 shadow-xl bg-cyan-900 hover:bg-cyan-950 rounded-full hover:cursor-pointer">
                      <p>play.cyanrealms.com</p>
                    </div>
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
