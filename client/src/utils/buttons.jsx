import React from 'react'

export default function Button ({ text, onclick }) {
  return (
    <>
      <button onClick={onclick} className='py-1.5 px-3 font-semibold rounded-md bg-transparent ring-1 ring-white text-white duration-500 hover:bg-white hover:bg-opacity-10 text-base outline-none'>
        {text}
      </button>
    </>
  )
};