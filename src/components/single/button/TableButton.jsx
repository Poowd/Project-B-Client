export default function TableButton({ children }) {
  return (
    <div
      className={`size-10 flex justify-center items-center text-lg rounded-full bg-neutral-700 hover:bg-red-600 hover:cursor-pointer shadow-sm text-white`}
    >
      {children}
    </div>
  );
}
