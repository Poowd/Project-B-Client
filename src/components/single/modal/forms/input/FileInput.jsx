export default function FileInput({
  style,
  text_style,
  message,
  onChange,
  placeholder,
  id,
}) {
  return (
    <div className="flex flex-col text-center">
      <input
        type="file"
        className={`${style} text-center text-neutral-400`}
        placeholder={placeholder}
        id={id}
        onChange={onChange}
        accept="image/jpg, image/jpeg"
      />
      <label htmlFor={id}>
        <span className={text_style}>{message}</span>
      </label>
    </div>
  );
}
