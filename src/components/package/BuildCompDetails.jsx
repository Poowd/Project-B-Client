import { getFormattedDate } from "../../hooks/functions/getFormattedDate";

export default function BuildCompDetails({ buildcomp, children, entries }) {
  return (
    <main className="w-full">
      <main className="p-5 lg:p-10 flex gap-5 lg:gap-10">
        <section className="flex-1">
          <section className="w-full mb-10">
            <figure className="w-full aspect-video border border-neutral-800 rounded-t mb-5">
              <img
                src={buildcomp[6]}
                alt={buildcomp[1]}
                className={"size-full object-cover rounded-t"}
              ></img>
            </figure>
            <h3 className="text-xl">{buildcomp[2]}</h3>
            <h1 className="text-4xl font-bold">{buildcomp[1]}</h1>
            <p>{`${getFormattedDate(buildcomp[3])} until ${getFormattedDate(
              buildcomp[4]
            )}`}</p>
            <hr className="my-5" />
            <pre>{buildcomp[5]}</pre>
          </section>
          <section>
            <h3 className="text-xl mb-5">Build Entries</h3>
            <div className="flex flex-col gap-3">{entries}</div>
          </section>
        </section>
        <section className="flex-none w-2/6 text-center flex flex-col gap-5">
          <h3 className="text-xl font-semibold">Rewards</h3>
          {children}
        </section>
      </main>
    </main>
  );
}
