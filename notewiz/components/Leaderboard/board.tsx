import React from 'react'

const board = () => {
  return (
    <div>
      <h1 className='flex justify-center text-4xl mt-10'>Leaderboard</h1>
    <div className=' text-base flex justify-center gap-6 mt-10'>
      <button className=' bg-gray-400 text-white rounded-md px-8 py-3 hover:bg-black'>7 Days</button>
      <button className='bg-gray-400 text-white rounded-md px-8 py-3 hover:bg-black'>30 Days </button>
      <button className='bg-gray-400 text-white rounded-md px-8 py-3 hover:bg-black'>All Time </button>
      </div>
      <div>
        
      </div>
    </div>
  )
}

export default board
