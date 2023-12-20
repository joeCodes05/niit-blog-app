import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/authContext'
import CommentForm from '../utils/commentsForm';
import axios from 'axios';
import CommentContent from '../utils/commentsContent';

const Comments = ({ post_id }) => {
  const { currentUser } = useContext(AuthContext);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fethComments = async () => {
      try {
        const response = await axios.get(`/comments/${post_id}`);
        const reversedComment = [...response.data.commentData];
        reversedComment.reverse();
        setComments(reversedComment);
      } catch (err) {
        console.log(err);
      }
    }

    fethComments();
  }, [post_id]);

  return (
    <>
      <div className='mt-2 max-w-xl mx-auto'>
        {!currentUser ? null : <CommentForm post_id={post_id} />}
        <div className="mt-5 space-y-4">
          {comments.length === 0 ? <h1 className='my-10 text-center text-xl font-normal text-gray-400'>Be the first to comment</h1> : comments.map((comments) => {
            const { comment_content, full_name, profile_image, user_id, created_at, comment_id, email } = comments;

            return (
              <CommentContent
                key={comment_id}
                fullName={full_name}
                profileImage={profile_image}
                path={`/profile/${user_id}`}
                content={comment_content}
                commentId={comment_id}
                commentTime={created_at}
                email={email}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Comments