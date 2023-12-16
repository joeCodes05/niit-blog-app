import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import PrimaryButton from './primaryButton';
import { useNavigate } from 'react-router-dom';

const ProfileButton = ({ onClick }) => {
  const { currentUser, lastName, firstName } = useContext(AuthContext);
  const navigator = useNavigate();

  return (
    <>
      {currentUser?.userData === undefined ? <PrimaryButton
        text={'Sign up'}
        onClick={() => navigator('/signup')}
      /> : <button onClick={onClick} className="flex gap-2 ring-0 lg:ring-1 ring-gray-700 outline-none items-center bg-secondary p-0 lg:p-1 lg:pr-2 lg:rounded-md rounded-full">
        <div className='lg:h-[30px] lg:w-[30px] w-[40px] h-[40px] overflow-hidden lg:rounded-md rounded-full'>
          {currentUser?.userData.profile_image === null ? <div className='bg-primary text-dark py-1 px-1.5 rounded-md'>
          {firstName.charAt(0)}{lastName.charAt(0)}
        </div> : <img width={'100%'} src={`../upload/${currentUser?.userData.profile_image}`} alt={currentUser?.userData.full_name} />}
        </div>
        <div className='text-white text-sm hidden lg:block'>
          {currentUser?.userData.full_name}
        </div>
      </button>}
    </>
  )
}

export default ProfileButton