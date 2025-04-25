export default function Card2({ background, image, title, children }) {
  return (
    <main
      className={`w-full aspect-video flex items-center p-10 rounded delay-300 duration-150 ease-in-out ${background} scale-up-center`}
    >
      <section
        className={`flex-none h-4/5 aspect-square border border-white rounded-full flex justify-center items-center`}
      >
        <figure className="p-3 size-full">
          <img src={`${image}`} alt={children} className={"size-full"}></img>
        </figure>
      </section>
      <section className="flex-1 overflow-hidden text-ellipsis">
        <h1 className={`text-2xl font-extrabold`}>{children}</h1>
        <p className="text-xs">{title}</p>
      </section>
    </main>
  );
}
