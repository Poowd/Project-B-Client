import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { SlArrowUp } from "react-icons/sl";

export default function PetDetail({ button, children, highlights }) {
  return (
    <main className={`w-full h-fit p-5 rounded ${highlights ? highlights : 'bg-neutral-800'} delay-300 duration-150 ease-in-out`}>
      <Disclosure>
        {({ open }) => (
          /* Use the `open` state to conditionally change the direction of an icon. */
          <main>
            <DisclosureButton className="w-full outline-0 p-0 m-0 flex justify-between items-center">
              <span>{button}</span>
              <SlArrowUp className={open ? "" : "rotate-180 transform"} />
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
