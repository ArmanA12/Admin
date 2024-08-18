import React from 'react'
import { FaSearch,FaRegBell,FaEnvelope } from 'react-icons/fa'
import profile from '../assets/profile.png'

function DashboardView() {
    return (
        <div className='flex items-center justify-between h-[70px] shadow-lg px-[25px]'>
            <div className='flex items-center rounded-[5px] costomclass'>
                <input type='text' className='bg-[#F8F9FC] h-[40px] outline-none pl-[13px] w-[350px] rounded-[5px] placholder:text-[14px] leading-[20px] font-normal' placeholder='Search For..' />
                <div className='bg-[#4E73DF] h-[40px] px-[14px] flex items-center justify-center cursor-pointer rounded-tr-[5px]  rounded-br-[5px]'>
                    <FaSearch color='white' />
                </div>
            </div>
            <div className='flex items-center gap-[15px] relative'>
                <div className='flex items-center gap-[25px] border-r-[1px] pr-[25px]'>
                    <FaRegBell />
                    <FaEnvelope />
                </div>
                <div className='flex items-center gap-[15px] relative'>
                    
                    <div className='h-[50px] w-[50px] flex items-center justify-center relative bg-[#4E73DF]rounded-full'>
                        <img src={profile} alt='' className='h-[40px] w-[40px]'/>
                    </div>
                    <p>Admin</p>
                </div>
            </div>
        </div>
    )
}

export default DashboardView