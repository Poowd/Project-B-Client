export default function LabeledInput({
  style,
  onChange,
  placeholder,
  id,
  label,
  value,
}) {
  return (
    <div className="flex flex-col text-start">
      <label htmlFor={id} className="text-sm mb-1">
        {label}
      </label>
      <input
        className={`py-2 px-3 outline outline-neutral-300  rounded ${style}`}
        placeholder={placeholder}
        id={id}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
