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
}) {
  return (
    <InformationModal
      button={
        <div className="hover:-translate-y-2 delay-100 duration-300 hover:cursor-pointer scale-up-center">
          <main className="h-full w-full flex flex-col gap-2">
            <section className="flex-1 outline-0 rounded aspect-square flex justify-center items-center ">
              <figure className="p-5 w-full">
                <img
                  src={`${image}`}
                  alt={name}
                  className={"w-full aspect-square rounded"}
                ></img>
              </figure>
            </section>
            <section className="flex-none">{name}</section>
          </main>
        </div>
      }
      buttons={buttons}
    >
      <main className={`h-fit lg:h-full lg:flex gap-5`}>
        <section className="flex-1 rounded p-5 h-full overflow-y-auto">
          <main className="h-full flex flex-col">
            <section className="lg:w-full flex flex-col items-center mb-5">
              <div className="text-center">
                <h1 className={`text-xl font-bold ${color}`}>{name}</h1>
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
            <section className="flex flex-col gap-3 text-center">
              {children}
            </section>
          </main>
        </section>
        <section className="flex-none h-full lg:w-1/2 lg:border-l border-l-neutral-300 p-5 overflow-y-auto">
          <main>
            <header className="text-center mb-5">
              <h1 className={`text-2xl font-semibold ${color}`}>{title}</h1>
            </header>
            <main className="flex flex-col gap-3">
              <main className="mb-5">
                <pre className="text-justify leading-8 text-sm">{lore}</pre>
              </main>
            </main>
          </main>
        </section>
      </main>
    </InformationModal>
  );
}
