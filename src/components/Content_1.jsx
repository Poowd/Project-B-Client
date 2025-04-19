export default function Content_1({ children }) {
  return (
    <main
      className={`h-fit w-full lg:w-[1024px] lg:max-w-[1250px] flex flex-col items-center py-5 px-5 lg:px-10`}
    >
      {children}
    </main>
  );
}
