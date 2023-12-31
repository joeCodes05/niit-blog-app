import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Logo from '../assets/images/28aOt4-LogoMakr.png'
import { IoSearch } from "react-icons/io5";
import Button from '../utils/buttons';
import ProfileButton from '../utils/profileBtn';
import AccountMenu from '../utils/accountMenuDropdown';
import { DropdownContext } from '../context/dropdownContext';
import { AuthContext } from '../context/authContext';

export default function Navbar() {
  const location = useLocation();
  const navigtor = useNavigate();
  const { dropdownOpen, setDropdownOpen } = useContext(DropdownContext)
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      {(location.pathname === '/login') || (location.pathname === '/signup') ? null : <header className="bg-dark border-b border-b-gray-600 fixed top-0 left-0 right-0 z-10">
        <nav className="xl:mx-auto mx-5 relative flex max-w-7xl items-center justify-between py-3 lg:px-0  md:px-3" aria-label="Global">
          <div className="flex">
            <Link to={'/'} className="-m-1.5 p-1.5">
              <span className="sr-only">Swoosh</span>
              <img className="h-10 w-auto" src={Logo} alt="swoosh logo" />
            </Link>
          </div>

          <div className="mx-auto">
            <form action="#" className='md:flex hidden items-center rounded-md ring-1 ring-gray-700 bg-secondary'>
              <div className="p-2 text-gray-400">
                <IoSearch />
              </div>
              <input type="text" className='h-full box-border lg:w-[400px] md:w-[300px] p-2 pl-0 outline-none bg-transparent border-none text-gray-400 text-sm' placeholder='Search for any post...' />
            </form>
          </div>

          <div className="flex gap-3 lg:justify-end">
            {currentUser === null ? null : <Button
              onclick={() => navigtor('/post/create')}
              text={'New post'}
            />}
            <ProfileButton onClick={() => setDropdownOpen(!dropdownOpen)} />
          </div>

          {/* account menu dropdown */}
          {dropdownOpen ? <AccountMenu /> : null}
        </nav>
      </header>}
    </>
  )
}
