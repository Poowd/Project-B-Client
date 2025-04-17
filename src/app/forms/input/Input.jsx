export default function Input({ style, onChange, placeholder, id }) {
  return (
    <div className="flex flex-col text-start">
      <input
        className={style}
        placeholder={placeholder}
        id={id}
        onChange={onChange}
      />
    </div>
  );
}
