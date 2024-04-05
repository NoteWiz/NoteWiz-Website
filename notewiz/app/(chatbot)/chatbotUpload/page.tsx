import Upload from "@/components/FileDrag/Drag-Drop";
import SmallSidebar from "@/components/Sidebar/smallSidebar";
import { permanentRedirect } from "next/navigation";
export default function page() {
  return (
    <div>
      <SmallSidebar />
    <div className="bg-[#90CBFF] w-screen h-screen flex justify-center">
      <div className="bg-[#FFE57D] w-2/3 h-[600px] flex justify-center items-center rounded-md mt-[50px] border-4 border-black ">
        <div className="flex flex-row justify-between mx-7 mb-[300px]">
          <h2 className="font-bold text-5xl">Upload your Document</h2>
          <p className="w-[500px] leading-5 pt-10">
            You will be able to start a conversation based on the document
            uploaded. Please upload only one file.
          </p>
        </div>
        <div className="fixed mt-64"> 
      <Upload/>

        </div>
      </div>
    </div>
    </div>
  );
}
