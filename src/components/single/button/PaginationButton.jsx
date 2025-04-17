"use client";

export default function PaginationButton({ disableIn, children, action }) {
  return (
    <button
      className={`py-2 px-3  rounded text-xs bg-neutral-100 ${
        disableIn ? "text-neutral-300" : "text-neutral-800"
      } hover:bg-neutral-200`}
      onClick={action}
      disabled={disableIn}
    >
      {children}
    </button>
  );
}
