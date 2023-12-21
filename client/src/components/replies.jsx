import moment from 'moment'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { BsTrash } from 'react-icons/bs'
import { AuthContext } from '../context/authContext'
import Swal from 'sweetalert2'
import axios from 'axios'

const Replies = ({ profile_image, full_name, path, replyTime, email, content, replyId }) => {
  const { currentUser } = useContext(AuthContext);
  const fullName = full_name;
  const tempArray =
    full_name === undefined ? null : fullName?.split(" ");

  const lastName = tempArray === null ? null : tempArray?.pop();
  const firstName = tempArray === null ? null : tempArray?.join(" ");

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
          text: "Your reply has been deleted.",
          icon: "success"
        });

        const deleteReply = async () => {
          try {
            await axios.delete(`/replies/${replyId}`, { withCredentials: true });
            window.location.reload();
          } catch (err) {
            console.log(err);
          }
        }

        deleteReply();
      }
    });
  }

  return (
    <>
      <div className="mt-5 space-y-3 ml-[30px]">
        <div className='md:w-[300px] w-auto bg-secondary p-2 overflow-hidden rounded-[16px] shadow'>
          <div className="flex">
            <div className='flex gap-2 items-center'>
              <div className='lg:h-[30px] lg:w-[30px] w-[40px] h-[40px] overflow-hidden rounded-full'>
                {!profile_image ? <div className='bg-primary flex items-center justify-center h-full w-full text-dark'>
                  {firstName?.charAt(0)}{lastName?.charAt(0)}
                </div> : <img src={`../upload/${profile_image}`} width={'100%'} alt={full_name} />}
              </div>
              <div>
                <Link to={path} className='no-underline text-white font-semibold text-sm'>{fullName}</Link>
                <div className="text-[.7rem] text-gray-400">
                  {moment(replyTime).fromNow()}
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
      </div>
    </>
  )
}

export default Replies