import Card2_Skeleton from "../single/card/Card2_Skeleton";

export default function SkeletonCubiods_1() {
  return (
    <>
      {[...Array(18)].map(() => (
        <Card2_Skeleton key={Math.random()} />
      ))}
    </>
  );
}
