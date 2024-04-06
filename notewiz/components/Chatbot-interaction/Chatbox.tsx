import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "../ui/scroll-area";
import { BotMessage } from "./BotMessage";
import { InputChat } from "./InputChat";
import { UserMessage } from "./UserMessage";

export default function Chatbox() {
  return (
    <div className="">
      <ScrollArea className="rounded-md border p-4 h-full border-gray-400 shadow-lg bg-[#559cd9] max-h-[90vh] overflow-scroll">
        <div className="flex flex-col  max-w-[40vw] gap-16 h-full overflow-scroll justify-between">
          <BotMessage />
          <UserMessage />
          <BotMessage />
          <BotMessage />
          <BotMessage />
        </div>
      </ScrollArea>
    </div>
  );
}
