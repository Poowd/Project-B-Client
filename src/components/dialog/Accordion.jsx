"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { SlArrowUp } from "react-icons/sl";

export default function Accordion({ button, children }) {
  return (
    <main
      className={`w-full h-fit rounded delay-300 duration-150 ease-in-out`}
    >
      <Disclosure>
        {({ open }) => (
          /* Use the `open` state to conditionally change the direction of an icon. */
          <main>
            <DisclosureButton className="w-full border-0 outline-0 p-0 m-0 text-start">
              {button}
            </DisclosureButton>
            <DisclosurePanel className={`${open ? "block mt-3" : "hidden"}`}>
              {children}
            </DisclosurePanel>
          </main>
        )}
      </Disclosure>
    </main>
  );
}
