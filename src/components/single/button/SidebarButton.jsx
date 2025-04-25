"use client";

import { useRouter } from "next/navigation";

export default function SidebarButton({ path, icon, children, sidebarStatus }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(path)}
      className={`w-full rounded text-sm py-3 hover:cursor-pointer hover:bg-neutral-950 hover:text-red-600 hover:scale-105 delay-75 duration-300 flex justify-start items-center ${
        sidebarStatus ? "lg:ps-5" : "lg:ps-2.5"
      }`}
    >
      <span className="mx-auto lg:mx-0 text-xl">{icon}</span>
      {sidebarStatus && (
        <span className="w-0 lg:w-fit hidden lg:block ms-1">{children}</span>
      )}
    </button>
  );
}
