export default function LabeledTextAreaInput({
  style,
  onChange,
  placeholder,
  id,
  value,
  label,
}) {
  return (
    <div className="flex flex-col text-start">
      <label htmlFor={id} className="text-sm mb-1">
        {label}
      </label>
      <textarea
        className={`py-2 px-3 outline-0 border border-neutral-800 focus:border-cyan-300 rounded ${style}`}
        rows={3}
        placeholder={placeholder}
        id={id}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
