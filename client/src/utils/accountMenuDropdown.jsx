import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { IoLogOutOutline, IoPersonOutline  } from "react-icons/io5";
import { DropdownContext } from '../context/dropdownContext';
import { AuthContext } from '../context/authContext';
import { GrUserSettings } from "react-icons/gr";

const AccountMenu = () => {
  const { setDropdownOpen } = useContext(DropdownContext);
  const { logout } = useContext(AuthContext);
  const navigator = useNavigate();

  return (
    <>
      <div className="absolute z-10 bg-dark space-y-2 top-full -my-1 w-[200px] shadow lg:mx-0 md:mx-3 right-0 ring-1 ring-gray-700 rounded-md p-2">
        <button onClick={() => {
          setDropdownOpen(false)
        }} className='outline-none w-full p-1.5 rounded-md bg-transparent text-white ring-1 ring-transparent duration-500 flex gap-2 items-center hover:bg-secondary text-[14px] hover:ring-gray-700'>
          <IoPersonOutline  />
          <div>Profile</div>
        </button>

        <button onClick={() => {
          setDropdownOpen(false)
        }} className='outline-none w-full p-1.5 rounded-md bg-transparent text-white ring-1 ring-transparent duration-500 flex gap-2 items-center hover:bg-secondary text-[14px] hover:ring-gray-700'>
          <GrUserSettings />
          <div>Account settings</div>
        </button>

        <button onClick={() => {
          setDropdownOpen(false);
          logout();
          navigator('/login')
        }} className='outline-none w-full p-1.5 rounded-md bg-transparent text-white ring-1 ring-transparent duration-500 flex gap-2 items-center hover:bg-secondary text-[14px] hover:ring-gray-700'>
          <IoLogOutOutline />
          <div>Log Out</div>
        </button>
      </div>
    </>
  )
}

export default AccountMenu