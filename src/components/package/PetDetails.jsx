import InformationModal from "../single/modal/InformationModal";

export default function PetDetails({ pet, children }) {
  return (
    <main className="h-fit lg:h-full lg:flex gap-5">
      <section className="flex-1 rounded p-5 h-full overflow-y-auto">
        <main className="h-full flex flex-col">
          <section className="lg:w-full flex flex-col items-center mb-5">
            <div className="text-center">
              <h1 className="text-xl font-bold">{pet[1]}</h1>
              <h3>{pet[3]} Pet</h3>
            </div>
            <figure className="size-40 p-2 mb-5">
              <img
                src={`${pet[4]}`}
                alt={pet[1]}
                className={"w-full aspect-square rounded"}
              ></img>
            </figure>
            <div className="text-start mb-5">
              <h1 className="text-2xl font-semibold">{pet[2]}</h1>
            </div>
            <div className="mb-5">
              <pre className="text-justify leading-8 text-sm">{pet[5]}</pre>
            </div>
          </section>
        </main>
      </section>
      <section className="flex-none h-full lg:w-1/2 lg:border-l border-l-neutral-300 p-5 overflow-y-auto">
        <main>
          <section className="flex flex-col gap-3 text-center">
            {children}
          </section>
        </main>
      </section>
    </main>
  );
}
