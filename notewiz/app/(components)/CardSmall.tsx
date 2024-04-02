import Image from "next/image";

export const CardSmall = (props: { img: any; p1: string; p2: string }) => {
  return (
    <div>
      <Image src={props.img} alt="img" height={150} className="w-full" />

      <div className="px-0 py-4 max-w-[16.667vw] ">
        <p className="text-[3vw] text-left text-wrap ">{props.p1}</p>
        <p className="py-2 text-left text-wrap">{props.p2}</p>
      </div>
    </div>
  );
};
