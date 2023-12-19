import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/authContext'
import CommentForm from '../utils/commentsForm';
import axios from 'axios';

const Comments = ({ post_id }) => {
  const { currentUser } = useContext(AuthContext);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fethComments = async () => {
      try {
        const response = await axios.get('/comments/');
        const reversedComment = [...response.data.commentData];
        reversedComment.reverse();
        setComments(reversedComment);
      } catch (err) {
        console.log(err);
      }
    }

    fethComments();
  }, []);

  return (
    <>
      <div className='mt-2 max-w-xl mx-auto'>
        {currentUser === null ? null : <CommentForm post_id={post_id} />}
      </div>
    </>
  )
}

export default Comments