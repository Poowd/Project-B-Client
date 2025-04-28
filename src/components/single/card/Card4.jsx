export default function Card4({
  subtitle,
  image,
  title,
  children,
  start,
  end,
}) {
  return (
    <main className="w-full h-fit border border-neutral-800 rounded hover:text-cyan-500 hover:cursor-pointer">
      <figure className="w-full aspect-video border border-neutral-800 rounded-t overflow-hidden">
        <img
          src={image}
          alt={children}
          className={
            "size-full object-cover rounded-t hover:scale-125 hover:rotate-3 delay-75 duration-100"
          }
        ></img>
      </figure>
      <header className="text-center p-2">
        <h1 className="text-lg">{title}</h1>
        <h3 className="text-sm text-neutral-500">{subtitle}</h3>
        <p className="text-xs text-neutral-500">{`${start} - ${end}`}</p>
      </header>
    </main>
  );
}
