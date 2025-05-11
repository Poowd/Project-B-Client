export default function LabeledInput({
  style,
  onChange,
  placeholder,
  id,
  label,
  value,
  required,
  type,
}) {
  return (
    <div className="flex flex-col text-start">
      <label htmlFor={id} className="text-sm mb-1">
        {label}
      </label>
      <input
        className={`py-2 px-3 outline-0 border border-neutral-800 focus:border-cyan-300 rounded ${style}`}
        placeholder={placeholder}
        id={id}
        onChange={onChange}
        value={value}
        required={required}
        type={type}
      />
    </div>
  );
}
