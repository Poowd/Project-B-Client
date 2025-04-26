import Card2 from "../single/card/Card2";
import InformationModal from "../single/modal/InformationModal";

export default function PetInformation({
  image,
  name,
  type,
  title,
  lore,
  children,
  buttons,
  color,
  bg_color,
}) {
  return (
    <InformationModal
      button={
        <Card2 background={bg_color} title={title} image={image}>
          {name}
        </Card2>
      }
      buttons={buttons}
    >
      <main className={`h-fit lg:h-full lg:flex`}>
        <section className={`flex-1 p-10 h-full overflow-y-auto ${bg_color} delay-300 duration-150 ease-in-out`}>
          <main className="h-full flex flex-col">
            <section className="lg:w-full flex flex-col items-center mb-5">
              <div className="text-center">
                <h1 className={`text-4xl font-bold`}>{name}</h1>
                <h3>{type} Pet</h3>
              </div>
              <figure className="size-40 p-2">
                <img
                  src={`${image}`}
                  alt={name}
                  className={"w-full aspect-square rounded"}
                ></img>
              </figure>
            </section>
            <section className="flex flex-col gap-5 text-center">
              {children}
            </section>
          </main>
        </section>
        <section className="flex-none h-full lg:w-1/2  p-10 overflow-y-auto bg-neutral-900 text-neutral-300">
          <main>
            <header className="text-center mb-5">
              <h1 className={`text-2xl font-semibold ${color}`}>{title}</h1>
            </header>
            <main className="flex flex-col gap-3">
              <main className="mb-5">
                <pre className="text-justify leading-8 font-extralight">
                  {lore}
                </pre>
              </main>
            </main>
          </main>
        </section>
      </main>
    </InformationModal>
  );
}
