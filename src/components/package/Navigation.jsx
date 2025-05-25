"use client";

import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { AiOutlineHome } from "react-icons/ai";
import { PiDog } from "react-icons/pi";
import NavigationButton from "../single/button/NavigationButton";
import { FaHammer } from "react-icons/fa6";
import { LuHammer } from "react-icons/lu";

export default function Navigation({ children }) {
  const [sidebarStatus, setSidebarStatus] = useState(true);

  const Sidebar = (open) => {
    if (open) {
      return "w-14 lg:w-72";
    }
    return "w-14 lg:w-20";
  };

  return (
    <main className={`flex flex-col items-center p-5`}>
      <section className="flex justify-center gap-5">
        <NavigationButton
          path={"/pages"}
          icon={<AiOutlineHome />}
          sidebarStatus={sidebarStatus}
        >
          Home
        </NavigationButton>
        <NavigationButton
          path={"/pages/cubiods"}
          icon={<PiDog />}
          sidebarStatus={sidebarStatus}
        >
          Pets
        </NavigationButton>
        <NavigationButton
          path={"/pages/buildcomp"}
          icon={<LuHammer />}
          sidebarStatus={sidebarStatus}
        >
          BuildComp
        </NavigationButton>
      </section>
      <hr className="w-1/2 text-neutral-800" />
    </main>
  );
}
