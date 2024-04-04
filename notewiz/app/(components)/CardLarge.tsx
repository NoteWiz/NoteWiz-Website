import Image from "next/image";
export const CardLarge = (props: { img: any; p1: string; p2: string }) => {
  return (
    <div className="flex  items-center justify-center bg-white gap-4 rounded-2xl">
      <div className="px-4 py-2 max-w-[23vw]">
        <p className="text-[3vw] text-left ">{props.p1}</p>
        <p className="py-4 text-left ">{props.p2}</p>
      </div>
      <div className="flex items-center">
        <Image src={props.img} alt="img2" height={330}></Image>
      </div>
    </div>
  );
};
