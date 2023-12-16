import React, { useState } from 'react'
import { LuSettings2 } from "react-icons/lu";
import { IoCloseOutline } from "react-icons/io5";
import { categoryData } from '../constants/categorydata';
import { Link } from 'react-router-dom';

const CategoryModal = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="ml-auto w-fit mr-5 xl:mr-0">
        <button onClick={() => setModalOpen(true)} className='bg-transparent w-fit text-gray-500 duration-500 hover:text-white outline-none font-semibold flex items-center gap-2'>
          <div>Category filter</div> <LuSettings2 />
        </button>

        {/* category modal */}
        {modalOpen ? <div className="fixed h-screen w-screen z-20 top-0 left-0 bg-dark bg-opacity-80">
          <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-dark rounded-[16px] shadow ring-1 ring-gray-700 py-8 w-[350px] md:w-[400px] max-h-[500px] h-full overflow-hidden">
            {/* close modal button */}
            <button onClick={() => setModalOpen(false)} className="absolute bg-white rounded-full h-[25px] w-[25px] flex items-center justify-center top-2 right-2">
              <IoCloseOutline className='text-dark' />
            </button>

            {/* modal content */}
            <div>
              <h1 className='text-white font-bold text-2xl text-center'>
                Choose topics to read
              </h1>
              <h3 className='text-gray-500 leading-4 text-base text-center px-5'>
                Pick topics you are interested in. You can always change these later.
              </h3>

              <div className="overflow-scroll category_modal h-full max-h-[400px] mt-2 overflow-y-auto overflow-x-hidden w-full px-5 py-3 pb-10">
                <div className="grid grid-cols-3 gap-2">
                  {categoryData.map((data, index) => {
                    const { title, path } = data;
                    return (
                      <Link onClick={() => setModalOpen(false)} to={path === undefined ? "/" : `/?topic=${path}`} key={index} className='bg-secondary duration-500 hover:bg-primary cursor-pointer shadow hover:shadow-primary outline-none hover:shadow-lg rounded-[16px] h-[100px] w-full flex items-center justify-center'>
                        <h4 className='text-white text-base font-normal text-center capitalize'>
                          {title.replaceAll("-", " ")}
                        </h4>
                      </Link>
                    )
                  })}
                </div>
                <div className="text-center w-full mt-1 text-gray-400">
                  <Link onClick={() => setModalOpen(false)} className='underline' to={'/'}>Show all posts</Link>
                </div>
              </div>
            </div>
          </div>
        </div> : null}
      </div>
    </>
  )
}

export default CategoryModal