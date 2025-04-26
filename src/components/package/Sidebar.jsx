"use client";

import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { AiOutlineHome } from "react-icons/ai";
import { PiDog } from "react-icons/pi";
import SidebarButton from "../single/button/SidebarButton";

export default function Sidebar({ children }) {
  const [sidebarStatus, setSidebarStatus] = useState(true);

  const Sidebar = (open) => {
    if (open) {
      return "w-14 lg:w-72";
    }
    return "w-14 lg:w-20";
  };

  return (
    <main className={`${Sidebar(sidebarStatus)} h-full p-5`}>
      <section className="flex justify-between items-center mb-3">
        {sidebarStatus && (
          <div className="hidden lg:block text-sm w-0 lg:w-full">
            Hello, Guardian!
          </div>
        )}
        <div
          className={`w-full flex ${
            sidebarStatus ? "justify-center lg:justify-end" : "justify-center"
          }`}
        >
          <button
            className="size-8 rounded-full text-xs hover:cursor-pointer hover:bg-neutral-950 delay-100 duration-100 flex justify-center items-center"
            onClick={() => {
              setSidebarStatus(!sidebarStatus);
            }}
          >
            {sidebarStatus ? <IoClose /> : <IoIosArrowForward />}
          </button>
        </div>
      </section>
      <hr className="w-full mb-5 text-neutral-800" />
      <section className="flex flex-col gap-2">
        <SidebarButton
          path={"/pages"}
          icon={<AiOutlineHome />}
          sidebarStatus={sidebarStatus}
        >
          Home
        </SidebarButton>
        <SidebarButton
          path={"/pages/cubiods"}
          icon={<PiDog />}
          sidebarStatus={sidebarStatus}
        >
          Pets
        </SidebarButton>
      </section>
    </main>
  );
}
