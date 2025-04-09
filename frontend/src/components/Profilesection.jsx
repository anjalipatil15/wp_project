import React from 'react';
import { IoIosContact } from "react-icons/io";
import { MdVerified } from 'react-icons/md';


function OtherUserProfile() {
  return (
    <div className="hidden xl:flex flex-col justify-between bg-[#303136] w-[18rem] shrink-0 h-screen sticky top-0 right-0">
      <div className="p-4">
        {/* Profile Header */}
        <div className="flex items-center">
          <img src="https://en.wikipedia.org/wiki/File:Dog_Breeds.jpg" alt="" className="w-12 h-12 rounded-full" />
          <div className="pl-2">
            <p className="text-white font-bold">Trayee</p>
            <p className="text-gray-400 text-sm">@trayee234</p>
            <p className="text-green-500 text-sm">Online</p>
          </div>
        </div>

        {/* Status */}
        <div className="mt-4 shadow-md bg-[#212226] p-4 rounded-md">
          <h6 className="text-gray-400 uppercase text-sm font-bold mb-2">Status</h6>
          <p className="text-white">Sleeping</p>
        </div>

        {/* About Me */}
        <div className="mt-4 shadow-md bg-[#212226] p-4 rounded-md">
          <h6 className="text-gray-400 uppercase text-sm font-bold mb-2">About Me</h6>
          <p className="text-white">I love playing video games!!</p>
        </div>

        {/* Mutual Friends */}
        <div className="mt-4 shadow-md bg-[#212226] p-4 rounded-md">
          <h6 className="text-gray-400 uppercase text-sm font-bold mb-2">Mutual Friends</h6>
          <div className="flex space-x-2">
            <IoIosContact className="text-white" />
            <IoIosContact className="text-white" />
            <IoIosContact className="text-white" />
          </div>
        </div>

      </div>

      {/* Empty space to fill the bottom */}
      <div className="flex-grow"></div>
    </div>
  );
}

export default OtherUserProfile;
