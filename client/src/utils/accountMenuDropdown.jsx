import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { IoLogOutOutline, IoPersonOutline } from "react-icons/io5";
import { DropdownContext } from '../context/dropdownContext';
import { AuthContext } from '../context/authContext';
import { GrUserSettings } from "react-icons/gr";
import Swal from 'sweetalert2'

const AccountMenu = () => {
  const { setDropdownOpen } = useContext(DropdownContext);
  const { logout } = useContext(AuthContext);
  const navigator = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const showPrompt = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to log out from this account?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#CE3DF3",
      cancelButtonColor: "#1C1F26",
      confirmButtonText: "Log out!",
      background: "#0E1217",
      color: "#fff"
    }).then((result) => {
      if (result.isConfirmed) {
        let timerInterval;
        Swal.fire({
          title: "You're logged out successfully!",
          icon: "success",
          timer: 2000,
          timerProgressBar: true,
          background: "#0E1217",
          showConfirmButton: false,
          color: "#fff",
          willClose: () => {
            clearInterval(timerInterval);
          }
        })
        logout();
        navigator('/login');
      }
    });
  }

  return (
    <>
      <div className="absolute z-10 bg-dark space-y-2 top-full -my-1 w-[200px] shadow lg:mx-0 md:mx-3 right-0 ring-1 ring-gray-700 rounded-md p-2">
        <Link to={`/profile/${currentUser?.userData.user_id}`} onClick={() => {
          setDropdownOpen(false);
        }} className='outline-none w-full p-1.5 rounded-md bg-transparent text-white ring-1 ring-transparent duration-500 flex gap-2 items-center hover:bg-secondary text-[14px] hover:ring-gray-700'>
          <IoPersonOutline />
          <div>Profile</div>
        </Link>

        <button onClick={() => {
          setDropdownOpen(false)
        }} className='outline-none w-full p-1.5 rounded-md bg-transparent text-white ring-1 ring-transparent duration-500 flex gap-2 items-center hover:bg-secondary text-[14px] hover:ring-gray-700'>
          <GrUserSettings />
          <div>Account settings</div>
        </button>

        <button onClick={() => {
          setDropdownOpen(false);
          showPrompt();
        }} className='outline-none w-full p-1.5 rounded-md bg-transparent text-white ring-1 ring-transparent duration-500 flex gap-2 items-center hover:bg-secondary text-[14px] hover:ring-gray-700'>
          <IoLogOutOutline />
          <div>Log Out</div>
        </button>
      </div>
    </>
  )
}

export default AccountMenu