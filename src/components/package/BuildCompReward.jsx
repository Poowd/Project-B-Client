import LabeledContent1 from "../LabeledContent1";
import BuildCompDetail from "../single/modal/BuildCompDetail";

export default function BuildCompReward({ title, rewards }) {
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ", ");
  };

  return (
    <main
      className={`flex-col gap-3 ${rewards.length > 0 ? "flex" : "hidden"}`}
    >
      <LabeledContent1 label={title}>
        <div className="flex flex-col gap-3">
          {rewards &&
            rewards.map((reward, rewardkey) => (
              <BuildCompDetail
                key={rewardkey}
                button={<div className="">{reward[2]}</div>}
              >
                <main className="text-sm text-start">
                  <section>
                    <h3>{`${formatNumber(reward[3])} ${reward[2]}`}</h3>
                  </section>
                </main>
              </BuildCompDetail>
            ))}
        </div>
      </LabeledContent1>
    </main>
  );
}
