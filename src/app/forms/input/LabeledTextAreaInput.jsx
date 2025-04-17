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
        className={`py-2 px-3 outline outline-neutral-300 text-sm rounded ${style}`}
        rows={5}
        placeholder={placeholder}
        id={id}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
