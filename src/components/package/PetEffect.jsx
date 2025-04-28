import { TbEditCircle } from "react-icons/tb";
import LabeledContent1 from "../LabeledContent1";
import TableButton from "../single/button/TableButton";
import FormModal from "../single/modal/FormModal";
import PetDetail from "../single/modal/PetDetail";
import EditEffect from "../../app/forms/EditEffect";

export default function PetEffect({ title, effects, highlight }) {
  return (
    <main
      className={`flex-col gap-3 ${effects.length > 0 ? "flex" : "hidden"}`}
    >
      <LabeledContent1 label={title}>
        <div className="flex flex-col gap-3">
          {effects &&
            effects.map((effect, effectkey) => (
              <PetDetail
                highlights={highlight}
                key={effectkey}
                button={<div className="">{effect[2]}</div>}
              >
                <main className="text-sm text-start">
                  <section>
                    <h3>{`Pet Level ${effect[3]}`}</h3>
                  </section>
                  <section>
                    <pre>{effect[4]}</pre>
                  </section>
                </main>
              </PetDetail>
            ))}
        </div>
      </LabeledContent1>
    </main>
  );
}
