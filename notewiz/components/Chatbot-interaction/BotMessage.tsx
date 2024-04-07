import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export const BotMessage = () => {
  return (
    <div className="flex flex-col gap-2 ">
      <div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex items-center justify-center bg-[#FFDC4D] rounded-lg p-2">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec elit
          sit amet mauris pretium interdum. Fusce sodales ipsum non ullamcorper
          ullamcorper.
        </p>
      </div>
    </div>
  );
};
