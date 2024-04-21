import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export const BotMessage = (props: any) => {
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
          I'm great!
        </p>
      </div>
    </div>
  );
};
