"use client";

import { Listbox, ListboxButton, ListboxOptions } from "@headlessui/react";

export default function NavigationListBox1({ value, options }) {
  return (
    <>
      <Listbox>
        <ListboxButton>{value}</ListboxButton>
        <ListboxOptions
          anchor="bottom"
          className={
            "w-fit mt-1.5 border border-neutral-900 bg-neutral-900 rounded p-2.5 text-start"
          }
        >
          {options}
        </ListboxOptions>
      </Listbox>
    </>
  );
}
