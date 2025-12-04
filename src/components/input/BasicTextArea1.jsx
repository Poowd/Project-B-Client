"use client";

export default function BasicTextArea1({
  label,
  name,
  value,
  onChange,
  description,
}) {
  return (
    <>
      <fieldset>
        <label htmlFor={name} className="text-sm mb-2.5">
          {label}
        </label>
        <p className="text-sm mb-2.5 text-neutral-400">{description}</p>
        <textarea
          className="w-full border border-neutral-700 bg-neutral-800 rounded py-2 px-4 text-start"
          type="text"
          value={value}
          name={name}
          id={name}
          onChange={onChange}
          rows={5}
          required
        ></textarea>
      </fieldset>
    </>
  );
}
