import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/images/28aOt4-LogoMakr.png'
import TextTruncate from 'react-text-truncate';
import { IoHeartOutline } from "react-icons/io5";
import { BsChatDots } from 'react-icons/bs'
import { IoIosShareAlt } from "react-icons/io";
import axios from 'axios';

const PostCard = ({ title, detail, profileImage, userName, coverPhoto, topic, postTime, path, userId, postId }) => {
  const fullName = userName;
  const tempArray = userName === undefined ? null : fullName.split(" ")
  const lastName = tempArray === null ? null : tempArray?.pop();
  const firstName = tempArray === null ? null : tempArray?.join(" ");

  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fethComments = async () => {
      try {
        const response = await axios.get(`/comments/${postId}`);
        const reversedComment = [...response.data.commentData];
        reversedComment.reverse();
        setComments(reversedComment);
      } catch (err) {
        console.log(err);
      }
    }

    fethComments();
  }, [postId]);

  function formatCompactNumber(number) {
    if (number < 1000) {
      return number;
    } else if (number >= 1000 && number < 1_000_000) {
      return (number / 1000).toFixed(1) + "K";
    } else if (number >= 1_000_000 && number < 1_000_000_000) {
      return (number / 1_000_000).toFixed(1) + "M";
    } else if (number >= 1_000_000_000 && number < 1_000_000_000_000) {
      return (number / 1_000_000_000).toFixed(1) + "B";
    } else if (number >= 1_000_000_000_000 && number < 1_000_000_000_000_000) {
      return (number / 1_000_000_000_000).toFixed(1) + "T";
    }
  }

  return (
    <>
      <div className='py-5 pb-3 px-3 rounded-2xl ring-1 ring-gray-700 bg-secondary text-white'>
        <Link to={`/profile/${userId}`} className="flex w-fit gap-2 items-center bg-transparent outline-none">
          <div className="h-[40px] w-[40px] overflow-hidden rounded-full">
            {profileImage === null ? <div className='bg-primary flex items-center justify-center h-full w-full text-dark'>
              {firstName.charAt(0)}{lastName.charAt(0)}
            </div> : <img src={profileImage} width={'100%'} alt={userName} />}
          </div>
          <div className='w-fit'>
            <h3 className='text-white font-semibold text-base text-left w-fit'>{userName}</h3>
            <h5 className='text-gray-400 text-[.7rem] text-left italic w-fit'>{postTime}</h5>
          </div>
        </Link>

        <Link to={path} className='no-underline outline-none group'>
          <div className="mt-3">
            <h1 className='text-white font-bold text-lg'>
              <TextTruncate
                line={1}
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
        </Link>

        <div className="mt-2">
          <div className="flex items-center gap-20 justify-center">
            <button className='outline-none no-underline'>
              <IoHeartOutline />
            </button>

            <Link to={`/post/${postId}`} className='outline-none no-underline flex gap-1 items-center'>
              <BsChatDots />
              <div className='text-[.8rem] text-gray-400'>
                {formatCompactNumber(comments.length > 0 ? comments.length : null)}
              </div>
            </Link>

            <button className='outline-none no-underline'>
              <IoIosShareAlt />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default PostCard