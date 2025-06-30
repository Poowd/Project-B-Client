import Link from "next/link";

export default function Page() {
  return (
    <main className="w-[90%] lg:w-[68%] mx-auto py-20">
      <section className="w-full grid grid-cols-5 gap-5">
        <Link href={"/guides/pets"} className="w-full t">
          <figure className="w-full flex justify-center items-center aspect-square rounded-2xl bg-neutral-900 hover:scale-105 delay-75 duration-150 ease-in-out mb-2.5">
            <img
              src={
                "https://images.minecraft-heads.com/render3d/head/4e/4e9d36172e0ff5ed11a8a5fc10579bb8.webp"
              }
              className="size-32"
            ></img>
          </figure>
          <p className="text-center">Cubiods</p>
        </Link>
        <Link href={"/guides/builds"} className="w-full t">
          <figure className="w-full flex justify-center items-center aspect-square rounded-2xl bg-neutral-900 hover:scale-105 delay-75 duration-150 ease-in-out mb-2.5">
            <img
              src={
                "https://images.minecraft-heads.com/render3d/head/7a/7ac81383be2080a1fc0df75a17a1c596.webp"
              }
              className="size-32"
            ></img>
          </figure>
          <p className="text-center">Build Competition</p>
        </Link>
      </section>
    </main>
  );
}
