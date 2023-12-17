import React from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { BsCamera } from 'react-icons/bs'
import Button from '../utils/buttons'

const Profile = () => {
  const navigator = useNavigate();

  return (
    <>
      <section className='mt-24 text-white mx-auto md:px-0 px-2 max-w-2xl'>
        <div>
          <button onClick={() => navigator('/')} className='py-1.5 px-3 font-normal rounded-md bg-secondary ring-1 ring-gray-700 text-gray-400 duration-500 text-base flex gap-1 items-center outline-none'>
            <IoArrowBackOutline />
            <div>
              My feed
            </div>
          </button>
        </div>

        <div className="mt-10">
          <div className="relative h-full">
            <div className="h-[200px] bg-gray-400 group relative rounded-t-[16px]">
              <button className="absolute opacity-0 group-hover:opacity-100 duration-500 outline-none bottom-0 right-0 m-3 bg-dark shadow rounded-full p-2 w-fit text-white flex gap-2 items-center justify-center">
                <BsCamera className='text-primary' /> <div className='text-[.8rem]'>Edit cover photo</div>
              </button>
            </div>
            <div className="absolute -bottom-16 group left-0 m-5 h-[150px] w-[150px] rounded-full overflow-hidden bg-primary">
              <button className='outline-none duration-500 group-hover:bg-opacity-70 h-full w-full bg-gray-800 bg-opacity-0 flex items-center justify-center text-2xl text-white gap-5'>
                <BsCamera className='opacity-0 group-hover:opacity-100 duration-500' />
              </button>
            </div>
          </div>

          <div className='ml-auto w-fit mt-3 px-5'>
            <Button
              text={'Edit profile'}
            />
          </div>

          <div className="mt-2 px-5">
            <div>
              <h3 className='text-white font-bold text-2xl'>
                Nathaniel Joseph
              </h3>
              <div className="text-gray-400 text-sm flex items-center gap-3">
                <div>
                  nathancodes05@gmail.com
                </div>
                <div>.</div>
                <div>
                  120 Posts written
                </div>
              </div>
            </div>

            <div className="mt-5 border border-gray-700 p-3 rounded-md">
              <div className="text-gray-400 text-sm">
                <h1 className='text-white text-lg font-semibold'>Biography:</h1>
                <div className='mt-2'>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut quibusdam voluptates laborum placeat velit? Sint libero, cumque, laborum odio explicabo ipsam iste sapiente alias voluptas deleniti maxime, laudantium optio enim.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Profile