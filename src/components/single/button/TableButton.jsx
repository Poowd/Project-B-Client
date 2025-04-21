export default function TableButton({ children }) {
  return (
    <div
      className={`size-10 flex justify-center items-center text-lg rounded-full bg-neutral-100 hover:bg-neutral-200 hover:cursor-pointer shadow-sm text-neutral-800`}
    >
      {children}
    </div>
  );
}
