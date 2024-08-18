import React, { useState } from 'react';
import { FaTachometerAlt, FaBars, FaTimes } from 'react-icons/fa';
import { GiTeacher } from 'react-icons/gi';
import { PiStudentDuotone } from 'react-icons/pi';
import { MdClass, MdDashboard } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation(); // Get current route

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    // Function to determine if the link is active
    const isActive = (path) => location.pathname === path;

    return (
        <div className='flex'>
            <div className={`bg-[#fff] h-screen fixed z-20 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform lg:translate-x-0 lg:relative`}>
                <div className='px-[25px]'>
                    <div className='px-[15px] py-[30px] flex items-center justify-between border-b-[1px] border-[#EDEDED]/[0.3]'>
                        <h1 className='text-[#6941C6] font-extrabold text-[20px] leading-[24px] cursor-pointer '>PEOPLE.CO </h1>
                        <button onClick={toggleSidebar} className='lg:hidden'>
                            <FaTimes color='black'  />
                        </button>
                    </div>
                    <div>
                        <Link to='/' className={`flex items-center gap-[5px] py-[10px] border-b-[1px] border-[#EDEDED]/[0.3] ${isActive('/') ? 'text-[#6941C6] ' : ''}`}>
                            <MdDashboard color={isActive('/') ? '#6941C6' : 'black'} />
                            <p className={`text-[14px] leading-[20px] font-bold ${isActive('/') ? 'text-[#6941C6]' : 'text-black'}`}>OverView</p>
                        </Link>
                    </div>
                    <div>
                        <Link to='/people/directory' className={`flex items-center gap-[5px] py-[10px] border-b-[1px] border-[#EDEDED]/[0.3] ${isActive('/people/directory') ? 'text-[#6941C6] ' : ''}`}>
                            <MdDashboard color={isActive('/people/directory') ? '#6941C6' : 'black'} />
                            <p className={`text-[14px] leading-[20px] font-bold ${isActive('/people/directory') ? 'text-[6941C6]' : 'text-black'}`}>People Directory</p>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='flex-1 lg:hidden'>
                <button onClick={toggleSidebar} className='p-4'>
                    <FaBars color='black' />
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
