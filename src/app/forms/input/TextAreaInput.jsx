export default function TextAreaInput({
  style,
  text_style,
  message,
  onChange,
  placeholder,
  id,
}) {
  return (
    <div className="flex flex-col text-center">
      <textarea
        className={style}
        placeholder={placeholder}
        id={id}
        onChange={onChange}
      />
      <label htmlFor={id}>
        <span className={text_style}>{message}</span>
      </label>
    </div>
  );
}
