"use client"
import { useState } from 'react'
import React from 'react'
import { Leaderboard } from './database'
import Profiles from './profile'

const board = () => {
  const [period, setPeriod] = useState(0);

  const handleClick = (e) => {
     
    setPeriod(e.target.dataset.id)
  }
  return (
    <div className='bg-[#FFE57D] h-full overflow-auto'>
      <h1 className='flex justify-center text-4xl pt-10 font-bold'>Leaderboard</h1>
    <div className=' text-base flex justify-center gap-6 mt-10'>
      <button className=' bg-[#559cd9] text-white rounded-md px-8 py-3 hover:bg-black' onClick={handleClick} data-id='7'>7 Days</button>
      <button className='bg-[#559cd9] text-white rounded-md px-8 py-3 hover:bg-black' onClick={handleClick} data-id='30'>30 Days </button>
      <button className='bg-[#559cd9] text-white rounded-md px-8 py-3 hover:bg-black' onClick={handleClick} data-id='0'>All Time </button>
      </div>
      <div>
        
      </div>
      <Profiles Leaderboard={between(Leaderboard, period)}></Profiles>
    </div>
  )
  function between(data, between){
    const today = new Date();
    const previous = new Date(today);
    previous.setDate(previous.getDate() - (between + 1));

    let filter = data.filter(val => {
        let userDate = new Date(val.dt);
        if (between == 0) return val;
        return previous <= userDate && today >= userDate;
    })

    // sort with asending order
    return filter.sort((a, b) => {
        if ( a.score === b.score){
            return b.score - a.score;
        } else{
            return b.score - a.score;
        }
    })
}
}

export default board
