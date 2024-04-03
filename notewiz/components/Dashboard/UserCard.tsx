import React from "react";
import Image from "next/image";
import Clock from "@/app/(images)/Clock.png";
import Followers from "@/app/(images)/Followers.png";
import UserProfile from "@/app/(images)/UserProfile.png";

const UserCard = () => {
  return (
    <div className="pl-custom-padding mb-10 mt-10">
      <div className="grid grid-cols-2">
        <div className=" items-center">
          <h1 className="text-xl font-bold"> Account Name</h1>
          <p className="mb-5">Username</p>
          <p> Joining Date </p>
          <p> Followers </p>
        </div>
        <div>
          <Image src={UserProfile} alt="" width={90}></Image>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
