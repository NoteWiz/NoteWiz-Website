import Image from "next/image";
import img2 from "../(images)/img2.png";

export const FeedbackCard = () => {
  return (
    <div className="rounded-xl overflow-hidden shadow-lg max-w-[400px] bg-white px-8 py-6">
      <div className="flex gap-2 items-center">
        <Image
          src={img2}
          alt="img"
          height={80}
          className="rounded-full border border-grey-950"
        ></Image>
        <p className="text-4xl px-4 ">Eric</p>
      </div>
      <div className="flex items-center mt-4">
        <p className="text-lg">
          With a personalized dashboard, monitor your progress and know which
          steps to take. And which not to. Compete for the top spot on the
          leaderboard and show off your ranks.
        </p>
      </div>
    </div>
  );
};
