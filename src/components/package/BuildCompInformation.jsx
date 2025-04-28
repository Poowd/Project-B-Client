import Card4 from "../single/card/Card4";
import InformationModal from "../single/modal/InformationModal";

export default function BuildCompInformation({ buildcomp, children, buttons }) {
  return (
    <InformationModal
      button={
        <Card4
          title={buildcomp[1]}
          subtitle={buildcomp[2]}
          start={buildcomp[3]}
          end={buildcomp[4]}
          image={buildcomp[6]}
        ></Card4>
      }
      buttons={buttons}
    >
      <main className="w-full">
        <figure className="w-full aspect-[16/8] border border-neutral-800 rounded-t shadow-xl shadow-neutral-950">
          <img
            src={buildcomp[6]}
            alt={buildcomp[1]}
            className={"size-full object-cover rounded-t"}
          ></img>
        </figure>
        <main className="p-5 lg:p-10 ">
          <section>
            <h3 className="text-xl">{buildcomp[2]}</h3>
            <h1 className="text-5xl font-bold text-cyan-500">{buildcomp[1]}</h1>
            <p className="text-neutral-500">{`${buildcomp[3]} until ${buildcomp[4]}`}</p>
            <hr className="my-5" />
          </section>
          <main className="flex flex-col md:flex-row gap-5 lg:gap-10">
            <section className="flex-1 text-justify text-neutral-500">
              <pre>{buildcomp[5]}</pre>
            </section>
            <section className="flex-none w-2/6 text-center flex flex-col gap-5">
              <h3 className="">Rewards</h3>
              {children}
            </section>
          </main>
        </main>
      </main>
    </InformationModal>
  );
}
