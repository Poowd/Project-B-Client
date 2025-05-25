export default function Card4({
  subtitle,
  image,
  title,
  children,
  start,
  end,
}) {
  return (
    <main className="w-full h-fit rounded text-white hover:cursor-pointer relative">
      <figure className="w-full aspect-video rounded-t overflow-hidden">
        <img
          src={image}
          alt={children}
          className={
            "size-full object-cover rounded-t hover:scale-125 hover:rotate-3 delay-75 duration-100"
          }
        ></img>
      </figure>
      <header className="absolute top-0 h-full w-full">
        <div className=" h-full w-full text-center p-2 hover:bg-neutral-950/75 hover:backdrop-blur-xs duration-300 delay-75 flex justify-center items-center">
          <div>
            <h1 className="text-xl font-bold">{title}</h1>
            <p className="text-xs">{`${start} - ${end}`}</p>
          </div>
        </div>
      </header>
    </main>
  );
}
