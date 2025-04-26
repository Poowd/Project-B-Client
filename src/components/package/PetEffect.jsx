import { TbEditCircle } from "react-icons/tb";
import LabeledContent1 from "../LabeledContent1";
import TableButton from "../single/button/TableButton";
import FormModal from "../single/modal/FormModal";
import PetDetail from "../single/modal/PetDetail";
import EditEffect from "../../app/forms/EditEffect";

export default function PetEffect({
  title,
  effects,
  fetchOnFinish,
  isAdmin,
  api,
  highlight,
}) {
  return (
    <main className="flex flex-col gap-3">
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
                  {isAdmin && (
                    <section className="mt-5">
                      <FormModal
                        button={
                          <TableButton>
                            <TbEditCircle />
                          </TableButton>
                        }
                      >
                        <EditEffect
                          fetchOnFinish={() => fetchOnFinish()}
                          api={api}
                          entry={{
                            ID: effect[0],
                            Pet: effect[1],
                            Effect: effect[2],
                            Level: effect[3],
                            Description: effect[4],
                          }}
                        ></EditEffect>
                      </FormModal>
                    </section>
                  )}
                </main>
              </PetDetail>
            ))}
        </div>
      </LabeledContent1>
    </main>
  );
}
