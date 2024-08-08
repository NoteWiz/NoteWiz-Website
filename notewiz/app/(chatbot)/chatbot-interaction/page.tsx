"use client";
import S from "@/components/FuncSidebar/S";
import pdf2 from "@/app/(images)/pdf2.png";
import { FileInfo } from "@/components/Chatbot-interaction/FileInfo";
import Chatbox from "@/components/Chatbot-interaction/Chatbox";
import { InputChat } from "@/components/Chatbot-interaction/InputChat";
export default function page() {
  return (
    <div>
      <S />
      <div className=" sm:ml-60">
        <div className="grid grid-cols-2 gap-x-2">
          <div className="flex items-center justify-center h-screen  ">
            <FileInfo />
          </div>
          <div className="flex flex-col justify-between  h-screen ">
            <Chatbox />
            <div className="flex justify-center">
              <InputChat />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
