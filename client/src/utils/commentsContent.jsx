import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BsTrash } from 'react-icons/bs'
import { AuthContext } from '../context/authContext';
import axios from 'axios';
import Swal from 'sweetalert2'
import ReplyForm from './replyForm';
import Replies from '../components/replies';

const CommentContent = ({ path, profileImage, fullName, content, commentTime, email, commentId }) => {
  const commentFullName = fullName;
  const tempArray =
    fullName === undefined ? null : commentFullName?.split(" ");

  const lastName = tempArray === null ? null : tempArray?.pop();
  const firstName = tempArray === null ? null : tempArray?.join(" ");

  const { currentUser } = useContext(AuthContext)

  const deletePrompt = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your comment has been deleted.",
          icon: "success"
        });

        const deleteComment = async () => {
          try {
            await axios.delete(`/comments/${commentId}`, { withCredentials: true });
            window.location.reload();
          } catch (err) {
            const errorMessage = err.response.data.message
            if (errorMessage === 'You can delete only your comment!') {
              Swal.fire({
                title: "Error!",
                text: "You cannot delete this comment, because it already has replies.",
                icon: "error"
              });
            }
          }
        }

        deleteComment();
      }
    });
  }

  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const response = await axios.get(`/replies/${commentId}`);
        const reversedReply = [...response.data.replyData];
        reversedReply.reverse();
        setReplies(reversedReply);
      } catch (err) {
        console.log(err);
      }
    }

    fetchReplies();
  }, [commentId]);

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
    <div className='ml-[65px]'>
      <div className='w-[350px] bg-secondary p-2 overflow-hidden rounded-[16px] shadow'>
        <div className="flex">
          <div className='flex gap-2 items-center'>
            <div className='lg:h-[30px] lg:w-[30px] w-[40px] h-[40px] overflow-hidden rounded-full'>
              {!profileImage ? <div className='bg-primary flex items-center justify-center h-full w-full text-dark'>
                {firstName?.charAt(0)}{lastName?.charAt(0)}
              </div> : <img src={`../upload/${profileImage}`} width={'100%'} alt={fullName} />}
            </div>
            <div>
              <Link to={path} className='no-underline text-white font-semibold text-sm'>{fullName}</Link>
              <div className="text-[.7rem] text-gray-400">
                {moment(commentTime).fromNow()}
              </div>
            </div>
          </div>

          <div className='ml-auto'>
            {currentUser.userData.email === email ? <button onClick={deletePrompt} className='bg-transparent border-0 outline-none p-0 text-sm text-gray-400'>
              <BsTrash />
            </button> : null}
          </div>
        </div>

        <div className="mt-2 text-white ml-[35px] text-base font-light">
          {content}
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={() => setShowReplyForm(!showReplyForm)} className='text-white outline-none no-underline hover:underline text-[.8rem] ml-5 font-light'>
          {showReplyForm ? "Hide form" : "Reply"}
        </button>

        {replies.length > 0 ? <button onClick={() => setShowReplies(!showReplies)} className='text-white outline-none no-underline hover:underline text-[.8rem] font-light'>
          {showReplies ? "Hide replies" : `Show replies (${formatCompactNumber(replies.length > 0 ? replies.length : null)})`}
        </button> : null}
      </div>

      <div className="ml-[10px]">
        <ReplyForm showForm={showReplyForm} setShowForm={setShowReplyForm} fullName={fullName} path={path} commentId={commentId} />

        {showReplies ? replies.map((data) => {
          const { content, profile_image, full_name, email, user_id, created_at, reply_id } = data;

          return (
            <Replies
              key={reply_id}
              replyId={reply_id}
              content={content}
              full_name={full_name}
              profile_image={profile_image}
              email={email}
              path={`/profile/${user_id}`}
              replyTime={created_at}
            />
          )
        }) : null}
      </div>
    </div>
  )
}

export default CommentContent