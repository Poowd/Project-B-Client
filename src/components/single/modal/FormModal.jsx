"use client";

import { Dialog, DialogPanel } from "@headlessui/react";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import TableButton from "../button/TableButton";

export default function FormModal({ button, children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(true)} className={`outline-0 p-0 m-0`}>
        {button}
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className={
          "fixed top-0 left-0 h-screen w-screen flex justify-center items-center backdrop-blur-sm p-5 z-100 bg-black/50"
        }
      >
        <DialogPanel
          className={"h-full lg:h-11/12 w-full lg:w-4/12 ounded p-5"}
        >
          <main className="w-full h-full flex flex-col gap-3 pe-3 lg:pe-0">
            <section className="flex-none flex justify-end gap-3">
              <div className="border border-neutral-300 p-2 rounded-full flex gap-2 bg-white">
                <button
                  onClick={() => setIsOpen(false)}
                  className="outline-0 p-0 m-0"
                >
                  <TableButton>
                    <IoCloseOutline />
                  </TableButton>
                </button>
              </div>
            </section>
            <section className="flex-1 border border-neutral-300 rounded bg-white overflow-y-auto">
              {children}
            </section>
          </main>
        </DialogPanel>
      </Dialog>
    </>
  );
}
