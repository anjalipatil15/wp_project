import React from 'react';
import Groups from './Groups';
import lmfao from '../photos/lmfao.jpg';
import { MdKeyboardVoice } from 'react-icons/md';
import { FaHeadphones } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';
import Topic from './Topic';
import { AiFillCompass } from 'react-icons/ai';
import { IoIosContact } from "react-icons/io";
import OtherUserProfile from './Profilesection';

function DMPage() {
  return (
    <div className="flex bg-[#393943] h-screen">
      <Groups />

      <div className="flex flex-grow h-screen">
        {/* Direct Messages */}
        <div className="hidden xl:flex flex-col justify-between bg-[#303136] w-[18rem] shrink-0 h-screen sticky top-0">
          <div className="p-4">
            {/* Title */}
            <p className="text-white font-bold text-[24px]">Direct Messages</p>
            {/* Topics */}
            <div className="mt-4 space-y-4 items-center">
              <Topic title="Anjali" icon={<IoIosContact />} />
              <Topic title="Trayee" icon={<IoIosContact />} />
              <Topic title="Parth" icon={<IoIosContact />} />
              <Topic title="Lakshit" icon={<IoIosContact />} />
              <Topic title="Anannya, Lakshit" icon={<IoIosContact />} />
            </div>
          </div>

          {/* Profile Settings */}
          <div className="bg-[#292b2f] h-[5rem] flex text-white/80 items-center px-4 justify-between">
            <div className="flex items-center ">
              <img src={lmfao} alt="" className="w-12 h-12 rounded-full" />
              <div className=" pl-2">
                <p>Wumpus</p>
                <p className="text-[14px] text-gray-400">#12345</p>
              </div>
            </div>

            <div className=" flex space-x-3 text-[20px]">
              <MdKeyboardVoice />
              <FaHeadphones />
              <IoMdSettings className=" " />
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex flex-col w-full h-screen p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Anjali</h2>
          </div>

          <div className="flex-grow overflow-y-auto bg-gray-650 p-4 rounded-md shadow-md">
  {/* Example messages */}
  <div className="mb-4">
    <p className="text-white">Anjali: Hello!</p>
    <p className="text-gray-400 text-sm">2024-04-10, 14:30</p>
  </div>
  <div className="mb-4">
    <p className="text-white">Trayee: Hi there!</p>
    <p className="text-gray-400 text-sm">2024-04-10, 14:31</p>
  </div>
</div>

          {/* Typing Bar */}
          <div className="bg-gray-700 p-4 flex items-center">
            <input
              type="text"
              placeholder="Type your message..."
              className="bg-gray-600 text-white rounded-md py-2 px-3 w-full focus:outline-none"
            />
            <button
              className="bg-blue-500 text-white rounded-md py-2 px-4 ml-2 hover:bg-blue-600"
            >
              Send
            </button>
          </div>

          
        </div>
      </div>
    
    {/* Other User's Profile */}
    <OtherUserProfile />
    </div>
  );
}

export default DMPage;
