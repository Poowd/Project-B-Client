export default function BuildCompReward({ rewards }) {
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ", ");
  };

  return (
    <main
      className={`flex-col gap-3 ${rewards.length > 0 ? "flex" : "hidden"}`}
    >
      <div className="flex flex-col gap-3">
        {rewards &&
          rewards.map((reward, rewardkey) => (
            <main key={rewardkey} className="text-sm text-start">
              <section>
                <h3>{`${formatNumber(reward[3])} ${reward[2]}`}</h3>
              </section>
            </main>
          ))}
      </div>
    </main>
  );
}
