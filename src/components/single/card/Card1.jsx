export default function Card1({ icon, children }) {
  return (
    <main className="w-full aspect-video border border-neutral-800 hover:border-cyan-600 text-neutral-300 hover:text-cyan-600 hover: inset-shadow-lg hover:inset-shadow-cyan-300 hover:border-4 bg-neutral-900 rounded flex justify-center items-center delay-100 duration-100 ease-in-out">
      <h1 className="text-2xl font-extrabold rounded flex flex-col items-center gap-2 text-center">
        <span>{icon}</span>
        <span>{children}</span>
      </h1>
    </main>
  );
}
