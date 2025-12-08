"use client";

export default function BasicTextArea1({
  label,
  name,
  value,
  onChange,
  description,
}) {
  return (
    <fieldset className="h-full flex flex-col justify-between">
      <label className="text-sm mb-2.5">
        <p>{label}</p>
        <p className="text-sm text-neutral-400">{description}</p>
      </label>
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
  );
}
