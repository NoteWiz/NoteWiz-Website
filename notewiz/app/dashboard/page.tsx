import ACard from "@/components/Dashboard/ACard";
import SCard from "@/components/Dashboard/SCard";
import UserCard from "@/components/Dashboard/UserCard";
import Sidebar from "@/components/Sidebar/Sidebar";
export default function page() {
  return (
    <div>
      <Sidebar/>
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
