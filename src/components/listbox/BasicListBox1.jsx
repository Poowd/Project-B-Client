"use client";

import { Listbox, ListboxButton, ListboxOptions } from "@headlessui/react";

export default function BasicListBox1({
  value,
  onChange,
  options,
  label,
  description,
}) {
  return (
    <>
      <label className="text-sm mb-2.5">{label}</label>
      <p className="text-sm mb-2.5 text-neutral-400">{description}</p>
      <Listbox value={value} onChange={onChange}>
        <ListboxButton
          className={
            "w-full border border-neutral-700 bg-neutral-800 rounded py-2 px-4 text-start"
          }
        >
          {value}
        </ListboxButton>
        <ListboxOptions
          anchor="bottom start"
          className={
            "w-fit mt-2.5 border border-neutral-700 bg-neutral-800 rounded p-2.5 text-start"
          }
        >
          {options}
        </ListboxOptions>
      </Listbox>
    </>
  );
}
