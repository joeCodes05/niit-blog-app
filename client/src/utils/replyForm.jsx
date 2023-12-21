import React, { useContext, useState } from 'react'
import PrimaryButton from './primaryButton'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext';
import axios from 'axios';

const ReplyForm = ({ fullName, path, commentId, showForm, setShowForm }) => {
  const [ replyContent, setReplyContent ] = useState('');
  const { currentUser } = useContext(AuthContext);

  const createReply = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/replies/', {
        content: replyContent,
        profile_image: currentUser.userData.profile_image,
        full_name: currentUser.userData.full_name,
        email: currentUser.userData.email,
        comment_id: commentId
      }, {withCredentials: true});

      setReplyContent('');
      setShowForm(!showForm)
      window.location.reload();
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      {showForm ? <form onSubmit={createReply} className='mt-5 ml-3'>
        <div className="flex gap-3">
          <div className='w-full'>
            <div className='text-[.8rem] text-gray-400 font-light mb-1'>
              Replying to <Link to={path} className='text-white underline'>{fullName}</Link>
            </div>
            <textarea value={replyContent} required onChange={(e) => setReplyContent(e.target.value)} name="commentScommentS" id="commentScommentSFiled" cols="30" rows="0" className='p-2 md:w-[300px] w-full bg-secondary ring-1 ring-gray-700 rounded-md text-sm bg-transparent resize-none outline-none font-light' placeholder='Post your reply'></textarea>

            <div className="mt-2">
              <PrimaryButton
                text={'reply'}
              />
            </div>
          </div>
        </div>
      </form> : null}
    </>
  )
}

export default ReplyForm