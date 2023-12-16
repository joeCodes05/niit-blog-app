import React from 'react'
import { categoryData } from '../constants/categorydata';

const CategoryDropButton = ({ value, onChange }) => {
  return (
    <>
      <select onChange={onChange} value={value} required name="categoryList" className='py-1.5 text-sm px-3 font-normal rounded-md bg-secondary ring-1 ring-gray-700 text-gray-400 duration-500 flex gap-1 items-center outline-none w-[150px]' id="categories">
        <option defaultValue={'Select topic'}>Select topic</option>
        {categoryData.map((data, index) => {
          const { title } = data;

          return (
            <option key={index} className='capitalize' value={title}>{title.replaceAll("-", " ")}</option>
          )
        })}
      </select>
    </>
  )
}

export default CategoryDropButton