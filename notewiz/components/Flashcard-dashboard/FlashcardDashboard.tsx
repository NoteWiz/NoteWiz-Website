import React from 'react'
import Sidebar from "@/components/FuncSidebar/S"
import Image from 'next/image'
import FirstImage from "@/assets/icons/Notebook.svg"
import SecondImage from "@/assets/icons/cuate.svg"
import ThirdImage from "@/assets/icons/Social Strategy.svg"

const FlashcardDashboard = () => {
  return (
    <div className='flex bg-[#252525]'>
        <Sidebar/>
        <div className='ml-[90px] w-[500px] mt-[72px] h-screen'>
            <div className=' first-card flex flex-col   '>
                <div className=' h-[300px]'>
                    <div className='w-full h-full bg-[#1E1E1E] rounded-2xl hover:-translate-y-[15px] border-2 border-b-4 border-r-4 cursor-pointer border-black transition-all duration-300 hover:border-[#00E340]'>
                        <div className='flex flex-row justify-between'>
                            <p className='text-white text-4xl font-DM_Sans tracking-tighter p-4 mt-24'>Share Flashcards</p>
                            <Image src={FirstImage} alt='' width={210} height={210} className='mt-10 object-cover'/>
                        </div>
                    </div>
                </div>
                <div className='second-card h-[300px] mt-8 w-full bg-[#1E1E1E] rounded-2xl hover:-translate-y-[15px] border-2 border-b-4 border-r-4 cursor-pointer border-black transition-all duration-300 hover:border-[#00E340]'>
                    <div className='flex flex-row justify-between'>
                        <p className='text-white text-4xl font-DM_Sans tracking-tighter p-4 mt-24'>View Previous Flashcards</p>
                        <Image src={SecondImage} alt='' width={210} height={210} className='mt-10 m-auto'/>
                    </div>
                </div>
            </div>
        </div>
            <div className='third-card h-[630px] w-[500px] mt-[72px] ml-8 rounded-2xl bg-[#1e1e1e] hover:-translate-y-[15px] cursor-pointer border-2 border-b-4 border-r-4 border-black transition-all duration-300 hover:border-[#00E340]'>
                <div className='flex flex-col justify-between'>
                    <p className='text-white text-4xl font-DM_Sans tracking-tighter p-4 mt-3 text-center'> Generate Flashcards</p>
                    <Image src={ThirdImage} alt='' height={600} width={600} className='mt-8'/>
                </div>
            </div>
    </div>
  )
}

export default FlashcardDashboard