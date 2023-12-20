import moment from 'moment';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { BsTrash } from 'react-icons/bs'
import { AuthContext } from '../context/authContext';
import axios from 'axios';
import Swal from 'sweetalert2'

const CommentContent = ({ path, profileImage, fullName, content, commentTime, email, commentId }) => {
  const full_name = fullName;
  const tempArray =
    fullName === undefined ? null : full_name?.split(" ");

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
          text: "Your file has been deleted.",
          icon: "success"
        });

        const deleteComment = async () => {
          try {
            await axios.delete(`/comments/${commentId}`, { withCredentials: true });
            window.location.reload();
          } catch (err) {
            console.log(err);
          }
        }

        deleteComment();
      }
    });
  }

  return (
    <div className='ml-[65px]'>
      <div className='w-[350px] bg-secondary p-3 overflow-hidden rounded-[16px] shadow'>
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
        <button className='text-white outline-none no-underline hover:underline text-[.8rem] ml-5 font-light'>Reply</button>

        <button className='text-white outline-none no-underline hover:underline text-[.8rem] font-light'>View all replies</button>
      </div>
    </div>
  )
}

export default CommentContent