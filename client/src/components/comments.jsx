import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/authContext'
import CommentForm from '../utils/commentsForm';
import axios from 'axios';

const Comments = () => {
  const { currentUser } = useContext(AuthContext);
  const [comments, setComments] = useState([]);

  useState(() => {
    const fethComments = async () => {
      try {
        const response = await axios.get('/comments/');
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    fethComments();
  }, []);

  return (
    <>
      <div className='mt-2 max-w-xl mx-auto'>
        {currentUser === null ? null : <CommentForm />}
      </div>
    </>
  )
}

export default Comments