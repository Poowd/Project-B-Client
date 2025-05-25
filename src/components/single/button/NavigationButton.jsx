"use client";

import { useRouter } from "next/navigation";

export default function NavigationButton({
  path,
  icon,
  children,
  sidebarStatus,
}) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(path)}
      className={`w-fit mb-2.5 rounded text-sm py-3 hover:cursor-pointer hover:bg-neutral-950 hover:text-red-600 hover:scale-105 delay-75 duration-100 flex justify-start items-center ${
        sidebarStatus ? "lg:px-5" : "lg:px-2.5"
      }`}
    >
      <span className="mx-auto lg:mx-0 text-xl">{icon}</span>
      {sidebarStatus && (
        <span className="w-0 lg:w-fit hidden lg:block ms-1">{children}</span>
      )}
    </button>
  );
}
