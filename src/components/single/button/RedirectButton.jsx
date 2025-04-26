"use client";

import Link from "next/link";

export default function RedirectButton({ path, newPage, children }) {
  return (
    <Link
      href={path}
      target={newPage && "_blank"}
      className="hover:text-cyan-100 hover:text-shadow-lg hover:text-shadow-cyan-300 delay-75 duration-100 ease-in-out"
    >
      {children}
    </Link>
  );
}
