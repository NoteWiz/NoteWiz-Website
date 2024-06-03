import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export const UserMessage = (props: any) => {
  return (
    <div className="flex flex-col items-end gap-2">
      <div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex items-center justify-center bg-[#FFDC4D] rounded-lg p-2">
        <p>
          How are you?
        </p>
      </div>
    </div>
  );
};
