import useFetchItem from "@/hooks/useFetchItem";
import { useEffect, useTransition } from "react";
import useGetImage from "@/hooks/useGetImage";
import PetInfo from "../single/modal/PetInfo";
import PetTraitDetails from "./PetTraitDetails";
import PetSkillDetails from "./PetSkillDetails";
import { AiOutlineLoading } from "react-icons/ai";

export default function PetInformation({ pet }) {
  return (
    <PetInfo
      button={
        <div className="hover:-translate-y-2 delay-100 duration-300 hover:cursor-pointer scale-up-center">
          <main className="h-full w-full flex flex-col gap-2">
            <section className="flex-1 outline-0 rounded aspect-square flex justify-center items-center ">
              <figure className="p-2">
                <img
                  src={pet.Image}
                  alt={"..."}
                  className="h-full aspect-square object-contain object-center rounded"
                ></img>
              </figure>
            </section>
            <section className="flex-none">{pet.Name}</section>
          </main>
        </div>
      }
    >
      <main className="h-full flex flex-col lg:flex-row gap-5">
        <section className="flex-1 rounded p-5 h-full overflow-y-auto">
          <main className="h-full flex flex-col">
            <section className="lg:w-full flex flex-col items-center mb-5">
              <div className="text-center">
                <h1 className="text-xl font-bold">{pet.Name}</h1>
                <h3>{pet.Type} Pet</h3>
              </div>
            </section>
            <section className="flex flex-col gap-3 text-center">
              {/* <PetTraitDetails traits={traits}></PetTraitDetails>
              <PetSkillDetails skills={skills}></PetSkillDetails> */}
            </section>
          </main>
        </section>
        <section className="flex-none h-full lg:w-1/2 border-l border-l-neutral-300 p-5 overflow-y-auto">
          <main>
            <header className="text-start">
              {/* <h1 className="text-2xl font-semibold">{pet.Title}</h1> */}
            </header>
            <main className="flex flex-col gap-3">
              <main className="mb-5">
                {/* <pre className="text-justify leading-8 text-sm">{pet.Lore}</pre> */}
              </main>
            </main>
          </main>
        </section>
      </main>
    </PetInfo>
  );
  // : (
  //   <section>
  //     <div className="">
  //       <main className="h-full w-full flex flex-col gap-2 border rounded border-neutral-300 bg-neutral-100">
  //         <section className="flex-1 outline-0 rounded aspect-square flex justify-center items-center ">
  //           <figure className="p-2 animate-spin">
  //             <AiOutlineLoading />
  //           </figure>
  //         </section>
  //         <section className="flex-none"></section>
  //       </main>
  //     </div>
  //   </section>
  // );
}
