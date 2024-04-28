import ACard from "@/components/Dashboard/ACard";
import SCard from "@/components/Dashboard/SCard";
import UserCard from "@/components/Dashboard/UserCard";
import S from "@/components/FuncSidebar/S";
// import Sidebar from "@/components/Sidebar/Sidebar";
export default function page() {
  return (
    <div className="border-green-500 flex flex-row ">
      <S/> 
      <UserCard/>
      <h1 className="text-xl my-5  flex justify-start pl-custom-padding"> Achievements</h1>
      <ACard/>
      <ACard/>
      <ACard/>
      <ACard/>
      <h1 className="text-xl flex my-5 justify-start pl-custom-padding"> Statistics</h1>
      <SCard/>
    </div>
  );
}
