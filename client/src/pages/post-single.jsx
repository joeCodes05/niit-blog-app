import React, { useEffect, useState } from 'react'
import { IoArrowBackOutline, IoTrashBinOutline } from 'react-icons/io5'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BsThreeDotsVertical, BsPen, BsChatDots } from 'react-icons/bs'
import { IoHeartOutline } from 'react-icons/io5'
import axios from 'axios';
import { useContext } from 'react'
import { IoIosShareAlt } from "react-icons/io";
import { AuthContext } from '../context/authContext'
import moment from 'moment'
import Comments from '../components/comments'

const PostSingle = () => {
  const navigator = useNavigate();
  const [post, setPost] = useState({});
  const location = useLocation();
  const postId = location.pathname.split('/')[2];
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/posts/${postId}`);
        setPost(response.data.data)
      } catch (err) {
        console.log(err)
      }
    }

    const redirect = () => {
      if (!currentUser) {
        navigator('/login')
      }
    }

    redirect();
    fetchData();
  }, [postId, currentUser, navigator])

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`, { withCredentials: true });
      navigator('/');
    } catch (err) {
      console.log(err)
    }
  }
  const [dropdownState, setDropdownStat] = useState(false);

  const fullName = post.full_name;
  const tempArray =
    post === undefined ? null : fullName?.split(" ");

  const lastName = tempArray === null ? null : tempArray?.pop();
  const firstName = tempArray === null ? null : tempArray?.join(" ");

  return (
    <>
      <section className="mt-24 text-white max-w-2xl mx-auto pb-5 md:px-0 px-3">
        <div>
          <button onClick={() => navigator('/')} className='py-1.5 px-3 font-normal rounded-md bg-secondary ring-1 ring-gray-700 text-gray-400 duration-500 text-base flex gap-1 items-center outline-none'>
            <IoArrowBackOutline />
            <div>
              My feed
            </div>
          </button>
        </div>

        <div className="mt-10">
          <h1 className='text-white md:text-4xl text-3xl font-bold'>
            {post?.title}
          </h1>

          <div className="mt-5">
            <div className="flex items-center">
              <Link to={`/profile/${post?.user_id}`} className="mt-2 no-underline flex gap-2 mr-auto items-center outline-none bg-transparent">
                <div className="h-[50px] w-[50px] overflow-hidden rounded-full">
                  {post?.profile_image === null ? <div className='bg-primary flex items-center justify-center h-full w-full text-dark'>
                    {firstName?.charAt(0)}{lastName?.charAt(0)}
                  </div> : <img src={`../upload/${post?.profile_image}`} width={'100%'} alt={post?.full_name} />}
                </div>
                <div>
                  <h3 className='text-white font-semibold text-base text-left'>{post?.full_name}</h3>
                  <h5 className='text-gray-400 text-sm text-left italic'>{moment(post?.created_at).fromNow()}</h5>
                </div>
              </Link>

              <div className='relative'>
                {currentUser?.userData.email === post?.email ? <button onClick={() => setDropdownStat(!dropdownState)} className='bg-transparent border-0 outline-none p-0 text-xl text-gray-400'>
                  <BsThreeDotsVertical />
                </button> : null}

                {dropdownState ? <div className="absolute top-full -left-32 p-2 rounded-md ring-1 bg-dark shadow-md ring-gray-700 w-[150px]">
                  <div className="space-y-2">
                    <div>
                      <Link to={`/post/create?edit=${post?.post_id}`} state={post} className='outline-none no-underline'>
                        <button className='w-full p-1.5 flex gap-2 items-center duration-500 ring-1 ring-transparent hover:bg-secondary hover:ring-gray-700 rounded-md text-gray-400 text-start text-sm'>
                          <BsPen />
                          <div>Edit post</div>
                        </button>
                      </Link>
                    </div>

                    <div>
                      <button onClick={handleDelete} className='w-full p-1.5 flex gap-2 items-center duration-500 ring-1 ring-transparent hover:bg-secondary hover:ring-gray-700 rounded-md text-gray-400 text-start text-sm'>
                        <IoTrashBinOutline />
                        <div>Delete post</div>
                      </button>
                    </div>
                  </div>
                </div> : null}
              </div>
            </div>
          </div>
          <div className="mt-10">
            <div className='pl-5 border-l-4 border-l-primary border-opacity-30 p-2 md:text-base text-sm text-gray-400 md:ml-5 ml-3'>
              {post?.content}
            </div>
          </div>

          <div className="mt-10 h-full relative overflow-hidden rounded-xl w-full md:max-h-[378px] max-h-[300px]">
            {post?.cover_image === null ? null : <img src={`../upload/${post?.cover_image}`} width={'100%'} className='rounded-xl' alt={post?.title} />}
          </div>

          <div className="my-5">
            <div className="w-full px-4 py-2 border-y border-y-gray-700 flex items-center md:gap-44 gap-20 text-gray-400 text-xl justify-center">
              <button className='bg-transparent outline-none border-0 p-0 flex flex-col items-center'>
                <IoHeartOutline />
                <div className='w-fit text-gray-400 text-[.7rem]'>Likes</div>
              </button>
              <button className='bg-transparent outline-none border-0 p-0 flex flex-col items-center'>
                <BsChatDots />
                <div className='w-fit text-gray-400 text-[.7rem]'>Comments</div>
              </button>
              <button className='bg-transparent outline-none border-0 p-0 flex flex-col items-center'>
                <IoIosShareAlt />
                <div className='w-fit text-gray-400 text-[.7rem]'>Share</div>
              </button>
            </div>
          </div>

          <Comments post_id={postId} />
        </div>
      </section>
    </>
  )
}

export default PostSingle