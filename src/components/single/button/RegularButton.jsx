"use client";

import { useRouter } from "next/navigation";

export default function RegularButton({ children }) {
  const router = useRouter();

  return (
    <div className="border-0 py-2 px-5 text-sm rounded-full bg-neutral-800 hover:bg-red-600 cursor-pointer shadow-sm text-white">
      {children}
    </div>
  );
}
