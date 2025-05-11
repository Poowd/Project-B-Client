import { getFormattedDate } from "../../hooks/functions/getFormattedDate";
import RedirectButton from "../single/button/RedirectButton";
import RegularButton from "../single/button/RegularButton";
import Card4 from "../single/card/Card4";
import InformationModal from "../single/modal/InformationModal";

export default function BuildCompInformation({ buildcomp, children, buttons, entries }) {
  return (
    <InformationModal
      button={
        <Card4
          title={buildcomp[1]}
          subtitle={buildcomp[2]}
          start={getFormattedDate(buildcomp[3])}
          end={getFormattedDate(buildcomp[4])}
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
        <main className="p-5 lg:p-10">
          <section>
            <h3 className="text-xl">{buildcomp[2]}</h3>
            <h1 className="text-5xl font-bold text-cyan-500">{buildcomp[1]}</h1>
            <p className="text-neutral-500">{`${getFormattedDate(
              buildcomp[3]
            )} until ${getFormattedDate(buildcomp[4])}`}</p>
            <hr className="my-5 text-neutral-800" />
          </section>
          <main className="flex flex-col md:flex-row gap-5 lg:gap-10">
            <section className="flex-1 text-justify text-neutral-500">
              <section className="w-full mb-10">
                <pre>{buildcomp[5]}</pre>
              </section>
              <section>
                <h3 className="text-xl mb-5">Build Entries</h3>
                <div className="flex flex-col gap-3">{entries}</div>
              </section>
            </section>
            <section className="flex-none w-full md:w-2/6 text-center flex flex-col gap-5">
              <section className="flex flex-col gap-3">
                <RedirectButton
                  path={`https://discord.com/channels/1209648981433389126/1258784051968610375`}
                  newPage={true}
                >
                  <RegularButton>
                    <h1 className="py-1">Register Now!</h1>
                  </RegularButton>
                </RedirectButton>
                <RedirectButton
                  path={`https://discord.com/channels/1209648981433389126/1258777576810483833`}
                  newPage={true}
                >
                  <RegularButton>
                    <h1 className="py-1">Submit a Build!</h1>
                  </RegularButton>
                </RedirectButton>
              </section>
              <section className="flex flex-col gap-3">
                <h3>Rewards</h3>
                {children}
              </section>
            </section>
          </main>
        </main>
      </main>
    </InformationModal>
  );
}
