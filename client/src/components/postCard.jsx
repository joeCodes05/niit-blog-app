import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/images/28aOt4-LogoMakr.png'
import TextTruncate from 'react-text-truncate';

const PostCard = ({ title, detail, profileImage, userName, coverPhoto, topic, postTime, path, authourEmail }) => {
  const fullName = userName;
  const tempArray = userName === undefined ? null : fullName.split(" ")
  const lastName = tempArray === null ? null : tempArray?.pop();
  const firstName = tempArray === null ? null : tempArray?.join(" ");

  return (
    <>
      <Link to={path} className='no-underline group outline-none'>
        <div className='py-5 pb-3 px-3 rounded-2xl ring-1 ring-gray-700 bg-secondary text-white'>
          <button className="flex gap-2 items-center bg-transparent outline-none">
            <div className="h-[40px] w-[40px] overflow-hidden rounded-full">
              {profileImage === null ? <div className='bg-primary flex items-center justify-center h-full w-full text-dark'>
                {firstName.charAt(0)}{lastName.charAt(0)}
              </div> : <img src={profileImage} width={'100%'} alt={userName} />}
            </div>
            <div>
              <h3 className='text-white font-semibold text-base text-left'>{userName}</h3>
              <h5 className='text-gray-400 text-[.7rem] text-left italic'>{postTime}</h5>
            </div>
          </button>

          <div className="mt-3">
            <h1 className='text-white font-bold text-lg'>
              <TextTruncate
                line={2}
                element="div"
                truncateText="…"
                text={title}
              />
            </h1>
          </div>

          <div className="mt-3">
            <div className="rounded-xl ring-1 ring-gray-700 p-2 text-gray-400 text-sm">
              <TextTruncate
                line={3}
                element="span"
                truncateText="…"
                text={detail}
              />

              <div className="mt-2 h-[150px] relative overflow-hidden w-full rounded-xl">
                <div className="bg-dark text-gray-400 absolute text-[.7rem] top-0 right-0 m-2 opacity-0 duration-500 group-hover:opacity-100 rounded-md py-[2px] px-2 shadow capitalize">
                  {topic.replaceAll("-", " ")}
                </div>
                {coverPhoto === null || coverPhoto === undefined ? <div className='w-full h-full flex items-center justify-center rounded-xl bg-gradient-to-r from-[#CE3DF3] to-[#FF386E]'>
                  <img src={Logo} width={'50%'} alt="Swoosh logo" />
                </div> : <img src={coverPhoto} width={'100%'} className='rounded-xl' alt={title} />}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}

export default PostCard