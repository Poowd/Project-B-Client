export default function SkeletonCubiods_2() {
  return (
    <>
      {[...Array(10)].map(() => (
        <section
          key={Math.random()}
          className="h-20 w-full bg-neutral-800 rounded blink-1"
        ></section>
      ))}
    </>
  );
}
