import React from 'react';

export default function Profiles({ Leaderboard }) {
  return (
    <div id="profile" className="mt-12">
      {Leaderboard.map((value, index) => (
        <div className="flex justify-between mx-60 mb-8 " key={index}>
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
