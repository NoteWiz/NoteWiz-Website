"use client"
import { useState } from 'react'
import React from 'react'
import { Leaderboard } from './database'
import Profiles from './profile'
import S from '../FuncSidebar/S'

const board = () => {
  const [period, setPeriod] = useState(0);

  const handleClick = (e:any) => {
     
    setPeriod(e.target.dataset.id)
  }
  return (
    <div className=' bg-[#252525] flex'>
      <S/>
    <div className='bg-[#252525] h-full overflow-auto m-5 text-white w-[80%]'>
      <h1 className='flex justify-center text-4xl pt-10 font-bold'>Leaderboard</h1>
    <div className=' text-base flex justify-center gap-6 mt-10 font-DM_Sans'>
      <button className=' bg-[#181818] text-white rounded-md px-8 py-3 hover:border-[#00E340] border-2 border-[#181818] transition-all duration-300 hover:border-2' onClick={handleClick} data-id='7'>7 Days</button>
      <button className='bg-[#181818] text-white rounded-md px-8 py-3 hover:border-[#00E340] border-2 border-[#181818] transition-all duration-300 hover:border-2' onClick={handleClick} data-id='30'>30 Days </button>
      <button className='bg-[#181818] text-white rounded-md px-8 py-3 hover:bg-black' onClick={handleClick} data-id='0'>All Time </button>
      </div>
      <div>
        
      </div>
      <Profiles Leaderboard={between(Leaderboard, period)}></Profiles>
    </div>
    </div>
  )
  function between(data:any, between:any){
    const today = new Date();
    const previous = new Date(today);
    previous.setDate(previous.getDate() - (between + 1));

    let filter = data.filter((val: { dt: string | number | Date }) => {
        let userDate = new Date(val.dt);
        if (between == 0) return val;
        return previous <= userDate && today >= userDate;
    })

    // sort with asending order
    return filter.sort((a: { score: number }, b: { score: number }) => {
        if ( a.score === b.score){
            return b.score - a.score;
        } else{
            return b.score - a.score;
        }
    })
}
}

export default board
