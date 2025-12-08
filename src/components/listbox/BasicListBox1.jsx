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
    <fieldset className="h-full flex flex-col justify-between">
      <label className="text-sm mb-2.5">
        <p>{label}</p>
        <p className="text-sm text-neutral-400">{description}</p>
      </label>

      <Listbox value={value} onChange={onChange}>
        <ListboxButton
          className={
            "h-10 w-full border border-neutral-700 bg-neutral-800 rounded py-2 px-4 text-start"
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
    </fieldset>
  );
}
