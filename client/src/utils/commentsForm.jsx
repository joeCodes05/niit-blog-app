import React, { useContext, useState } from 'react'
import PrimaryButton from './primaryButton'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import axios from 'axios'

const CommentForm = () => {
  const { currentUser } = useContext(AuthContext);
  const [ commentContent, setCommentContent ] = useState('');

  const fullName = currentUser?.userData.full_name;
  const tempArray =
    currentUser === null ? null : fullName?.split(" ");

  const lastName = tempArray === null ? null : tempArray?.pop();
  const firstName = tempArray === null ? null : tempArray?.join(" ");

  const createComment = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/comments/', {
        commentContent,
        comment_image: null,
        post_id: 16
      }, { withCredentials: true });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <form onSubmit={createComment}>
        <div className="flex gap-5 items-center">
          <Link to={`/profile/${currentUser?.userData.user_id}`} className='no-underline outline-none'>
            <div className='h-[50px] w-[50px] rounded-full overflow-hidden'>
              {currentUser?.userData.profile_image === null ? <div className='bg-primary flex items-center justify-center h-full w-full text-dark'>
                {firstName?.charAt(0)}{lastName?.charAt(0)}
              </div> : <img src={`../upload/${currentUser?.userData.profile_image}`} width={'100%'} alt={currentUser?.userData.full_name} />}
            </div>
          </Link>
          <div className='w-full'>
            <textarea value={commentContent} required onChange={(e) => setCommentContent(e.target.value)} name="commentScommentS" id="commentScommentSFiled" cols="30" rows="0" className='p-2 bg-secondary ring-1 ring-gray-700 rounded-md text-base bg-transparent w-full resize-none outline-none' placeholder='Post your commentScommentS'></textarea>

            <div className="mt-2">
              <PrimaryButton
                text={'commentS'}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default CommentForm