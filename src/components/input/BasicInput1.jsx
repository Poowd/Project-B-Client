"use client";

export default function BasicInput1({
  label,
  name,
  value,
  onChange,
  description,
  type,
}) {
  return (
    <fieldset className="h-full flex flex-col justify-between">
      <label className="text-sm mb-2.5">
        <p>{label}</p>
        <p className="text-sm text-neutral-400">{description}</p>
      </label>
      <input
        className="h-10 w-full border border-neutral-700 bg-neutral-800 rounded py-2 px-4 text-start"
        type={type || "text"}
        value={value}
        name={name}
        id={name}
        onChange={onChange}
        required
      />
    </fieldset>
  );
}
