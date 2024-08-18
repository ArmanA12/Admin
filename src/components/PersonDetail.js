import React from 'react';
import { FiX } from 'react-icons/fi'; // Close icon
import { IoMdTrendingUp } from "react-icons/io";

function PersonDetail({ person, onClose }) {
    if (!person) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-end overflow-y-auto">
            {/* Container for the whole modal */}
            <div className="w-full max-w-lg h-screen bg-white rounded-lg shadow-lg relative flex flex-col">

                {/* Header Section with Purple Background */}
                <div className="bg-[#2A5B7E] text-white p-4 flex items-center justify-between rounded-t-lg">
                    <div className="flex items-center space-x-4">
                        <img
                            src={`https://ui-avatars.com/api/?name=${person.name}&background=random`} // Example avatar URL
                            alt={`${person.name}'s avatar`}
                            className="w-16 h-16 rounded-full border border-gray-200"
                        />
                        <div>
                            <h3 className="text-xl font-bold">{person.name}</h3>
                            <p className="text-sm">{person.role}</p>
                            <p className="text-sm">ID: {person.id}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-300 hover:text-gray-100"
                    >
                        <FiX size={20} />
                    </button>
                </div>

                {/* Content Section with Custom Scroll */}
                <div className="flex-1 overflow-y-auto p-6 border-t border-gray-200 custom-scrollbar">
                    <h4 className="text-lg font-semibold mb-4 px-2 py-2 bg-[#E4E7EC] border-b border-gray-300 text-[#101828]">Personal Information</h4>
                    <div className="space-y-2">
                        <p className="pb-2 border-b border-gray-300 text-[#101828]">
                            <strong >Date of Birth:</strong> {person.dob}
                        </p>
                        <p className="pb-2 border-b border-gray-300 text-[#101828]">
                            <strong >Nationality:</strong> {person.nationality}
                        </p>
                        <p className="pb-2 border-b border-gray-300 text-[#101828]">
                            <strong >Gender:</strong> {person.gender}
                        </p>
                        <p className="pb-2 border-b border-gray-300 text-[#101828]">
                            <strong> Contact No:</strong> {person.contactNo}
                        </p>
                        <p className="pb-2 border-b border-gray-300 text-[#101828]">
                            <strong >Email Address:</strong> {person.email}
                        </p>
                        <p className="pb-2 border-b border-gray-300 text-[#101828]">
                            <strong >Work Email Address:</strong> {person.workEmail}
                        </p>
                    </div>

                    {/* Additional Section */}
                    <div className="mt-6">
                        <h4 className="text-lg font-semibold mb-4 px-2 py-2 bg-[#E4E7EC] border-b border-gray-300 text-[#101828]">Research & Publication</h4>
                        <div className="p-1">
                            <h5 className="font-medium text-[#101828]">AI And User Experience : The future Design</h5>
                            <p className="mt-2  text-[12px] ">
                                Publish in the Journal of Modern Design
                            </p>
                            <p className="mt-2  text-[12px]">AI, IoT based real time condition monitoring of Electrical Machines using Python language Abstract: Maintaining induction motors in good working order before they fail benefits small <span className='text-red-400 cursor-pointer'>See More...</span></p>
                            <div className = 'flex items-center gap-2 px-3 py-2'>
                                <IoMdTrendingUp className='text-red-400'/>
                                <span className='text-sm text-red-400'>SEE PUBLICATION</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PersonDetail;
