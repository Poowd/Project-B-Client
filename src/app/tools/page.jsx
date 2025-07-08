import Link from "next/link";

export default function Page() {
  return (
    <main className="w-[90%] lg:w-[68%] mx-auto py-20">
      <section className="w-full grid grid-cols-5 gap-5">
        <Link href={"/tools/xp-calculator"} className="w-full t">
          <figure className="w-full flex justify-center items-center aspect-square rounded-2xl bg-neutral-900 hover:scale-105 delay-75 duration-150 ease-in-out mb-2.5">
            <img
              src={
                "https://images.minecraft-heads.com/render3d/head/74/74600f7efc9eaa063e814ffdb1268315.webp"
              }
              className="size-32"
            ></img>
          </figure>
          <p className="text-center">Experience</p>
        </Link>
        <Link href={"/tools/ae-book-price"} className="w-full t">
          <figure className="w-full flex justify-center items-center aspect-square rounded-2xl bg-neutral-900 hover:scale-105 delay-75 duration-150 ease-in-out mb-2.5">
            <img
              src={
                "https://images.minecraft-heads.com/render3d/head/43/43821f05da4bc0737bee8e9cb871f684.webp"
              }
              className="size-32"
            ></img>
          </figure>
          <p className="text-center">Advance Enchantments</p>
        </Link>
      </section>
    </main>
  );
}
