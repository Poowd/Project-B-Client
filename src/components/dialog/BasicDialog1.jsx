"use client";

import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

export default function BasicDialog1({ isOpen, setIsOpen, title, content }) {
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center lg:p-5 bg-black/75 backdrop-blur">
          <DialogPanel className="w-full h-full lg:w-fit lg:h-fit overflow-y-auto space-y-4 bg-[#060606] text-neutral-100 p-5 lg:p-10 lg:rounded-2xl">
            <DialogTitle className="font-bold">{title}</DialogTitle>
            <main className="w-fit h-fit overflow-hidden">{content}</main>
          </DialogPanel>
        </div>
        <div className="fixed top-5 right-5">
          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
      </Dialog>
    </>
  );
}
