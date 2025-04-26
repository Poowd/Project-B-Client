"use client";

import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { AiOutlineHome } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { PiDog } from "react-icons/pi";
import { LuLayoutDashboard } from "react-icons/lu";
import { BiLogOutCircle } from "react-icons/bi";

export default function Devspot_Sidebar({ children }) {
  const router = useRouter();
  const [sidebarStatus, setSidebarStatus] = useState(true);

  const Sidebar = (open) => {
    if (open) {
      return "w-20 lg:w-72";
    }
    return "w-20";
  };

  return (
    <main className={`${Sidebar(sidebarStatus)} p-5`}>
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
      <hr className="w-full mb-5 text-neutral-100" />
      <section className="flex flex-col gap-2">
        <button
          onClick={() => router.push("/pages/")}
          className={`w-full rounded text-sm py-3 hover:cursor-pointer hover:bg-neutral-950 hover:text-red-400 delay-75 duration-100 flex justify-start items-center ${
            sidebarStatus ? "lg:ps-5" : "lg:ps-2.5"
          }`}
        >
          <span className="mx-auto lg:mx-0 text-xl">
            <AiOutlineHome />
          </span>
          {sidebarStatus && (
            <span className="w-0 lg:w-fit hidden lg:block ms-1">Home</span>
          )}
        </button>
        <hr className="my-3 text-neutral-700" />
        <button
          onClick={() => router.push("/devspot/pages")}
          className={`w-full rounded text-sm py-3 hover:cursor-pointer hover:bg-neutral-950 hover:text-red-400 delay-75 duration-100 flex justify-start items-center ${
            sidebarStatus ? "lg:ps-5" : "lg:ps-2.5"
          }`}
        >
          <span className="mx-auto lg:mx-0 text-xl">
            <LuLayoutDashboard />
          </span>
          {sidebarStatus && (
            <span className="w-0 lg:w-fit hidden lg:block ms-1">Dashboard</span>
          )}
        </button>
        <button
          onClick={() => router.push("/devspot/pages/cubiods")}
          className={`w-full rounded text-sm py-3 hover:cursor-pointer hover:bg-neutral-950 hover:text-red-400 delay-75 duration-100 flex justify-start items-center ${
            sidebarStatus ? "lg:ps-5" : "lg:ps-2.5"
          }`}
        >
          <span className="mx-auto lg:mx-0 text-xl">
            <PiDog />
          </span>
          {sidebarStatus && (
            <span className="w-0 lg:w-fit hidden lg:block ms-1">
              Pets: Cubiods
            </span>
          )}
        </button>
        <a href="/auth/logout">
          <button
            className={`w-full rounded text-sm py-3 hover:cursor-pointer hover:bg-neutral-950 hover:text-red-400 delay-75 duration-100 flex justify-start items-center ${
              sidebarStatus ? "lg:ps-5" : "lg:ps-2.5"
            }`}
          >
            <span className="mx-auto lg:mx-0 text-xl">
              <BiLogOutCircle />
            </span>
            {sidebarStatus && (
              <span className="w-0 lg:w-fit hidden lg:block ms-1">Logout</span>
            )}
          </button>
        </a>
      </section>
    </main>
  );
}
