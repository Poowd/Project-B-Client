"use client";

import { Dialog, DialogPanel } from "@headlessui/react";
import { useState } from "react";
import TableButton from "../button/TableButton";
import { IoCloseOutline } from "react-icons/io5";

export default function InformationModal({ button, buttons, children }) {
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
          "fixed top-0 left-0 h-screen w-screen flex justify-center items-center backdrop-blur-sm z-100 bg-black/50"
        }
      >
        <DialogPanel
          className={"h-full lg:h-11/12 w-full lg:w-4/6 rounded p-5"}
        >
          <main className="w-full h-full flex flex-col gap-3 lg:pe-0">
            <section className="flex-none flex justify-end gap-3">
              <div className="p-2 rounded-full flex gap-2 bg-neutral-900">
                {buttons}
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
            <section className="flex-1 rounded bg-neutral-900 overflow-y-auto">
              {children}
            </section>
          </main>
        </DialogPanel>
      </Dialog>
    </>
  );
}
