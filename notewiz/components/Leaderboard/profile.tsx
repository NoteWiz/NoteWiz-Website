import React from 'react';

export default function Profiles({ Leaderboard }:any) {
  return (
    <div id="profile" className="mt-12 font-DM_Sans ] ">
      {Leaderboard.map((value:{img:any,name:any,location:any,score:any}, index: React.Key | null | undefined) => (
        <div className="flex justify-between  mb-8 border-2 border-[#00E340] p-3 rounded-xl " key={index}>
          <div className="flex justify-between ">
        
            <img src={value.img} alt={value.name} className="w-20 h-20 rounded-full" />
            <div className="ml-4">
              <h3 className="text-dark font-semibold pr-3">{value.name}</h3>
              <span>{value.location}</span>
            </div>
          </div>
          <div className=" w-24 text-xl text-dark font-semibold text-right">{value.score}</div>
        </div>
      ))}
    </div>
  );
}
