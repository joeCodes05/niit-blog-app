import React, { useState } from 'react'
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5'

const FormControl = ({ placeholder, value, onChange, type }) => {
  const [seePassword, setSeePassword] = useState(false);
  return (
    <>
      {type === 'password' ? <div className='outline-none rounded-md overflow-hidden bg-secondary ring-1 ring-gray-700 flex gap-2 items-center'>
        <input type={seePassword ? 'text' : 'password'} className='p-2 outline-none text-sm text-white bg-transparent box-border w-full' placeholder={placeholder} value={value} onChange={onChange} required />
        <div className='text-gray-500 cursor-pointer px-2' onClick={() => setSeePassword(!seePassword)}>
          {seePassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
        </div>
      </div> : <input type={type} className='p-2 outline-none text-sm rounded-md bg-secondary ring-1 w-full box-border ring-gray-700 text-white' placeholder={placeholder} value={value} onChange={onChange} required />}
    </>
  )
}

export default FormControl