import React from 'react'

const WhiteButton = ({ text, onClick, width, disabled }) => {
  return (
    <>
      <button onClick={onClick} className={`py-1.5 px-3 font-semibold rounded-md ${disabled ? 'bg-gray-300 cursor-not-allowed ring-gray-300' : 'bg-white ring-white cursor-pointer'} ring-1 text-dark duration-500 hover:bg-gray-300 text-base outline-none ${width}`}>
        {text}
      </button>
    </>
  )
}

export default WhiteButton