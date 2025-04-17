export default function LabeledFileInput({
  style,
  label,
  onChange,
  placeholder,
  id,
  required,
}) {
  return (
    <div className="flex flex-col text-start">
      <label htmlFor={id} className="text-sm mb-1">
        {label}
      </label>
      <input
        type="file"
        className={`py-2 px-3 outline outline-neutral-300 text-sm rounded ${style}`}
        placeholder={placeholder}
        id={id}
        onChange={onChange}
        accept="image/jpg, image/jpeg"
        required={required}
      />
    </div>
  );
}
