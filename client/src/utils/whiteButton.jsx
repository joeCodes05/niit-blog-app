import React from 'react'

const WhiteButton = ({ text, onClick, width }) => {
  return (
    <>
      <button onClick={onClick} className={`py-1.5 px-3 font-semibold rounded-md bg-white ring-1 ring-white text-dark duration-500 hover:bg-gray-300 text-base outline-none ${width}`}>
        {text}
      </button>
    </>
  )
}

export default WhiteButton