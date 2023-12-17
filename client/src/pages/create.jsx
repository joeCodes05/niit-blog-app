import React, { useContext, useEffect, useRef, useState } from 'react'
import { IoArrowBackOutline, IoCamera, IoCloseOutline } from "react-icons/io5";
import { useLocation, useNavigate } from 'react-router-dom';
import CategoryDropButton from '../utils/categorySelect';
import WhiteButton from '../utils/whiteButton';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

const CreatePost = () => {
  const state = useLocation().state
  const navigator = useNavigate();
  const [title, setTitle] = useState(state?.title || '');
  const [content, setContent] = useState(state?.content || '');
  const [category, setCategory] = useState(state?.category || '');
  const [file, setFile] = useState(null);
  const [currentWordsTyped, setCurrentWordsTyped] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const { currentUser } = useContext(AuthContext);

  const inputRef = useRef(null);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post('/upload', formData);
      return response.data.uploadedFile;
    } catch (err) {
      console.log(err);
    }
  }
  const handleCreatePost = async (e) => {
    e.preventDefault();
    const wordCount = content.trim().split(/\s+/).length;

    if (wordCount >= 50) {
      const imageUrl = await upload();

      try {
        state ? await axios.put(`/posts/${state.post_id}`, {
          title,
          content,
          category,
          cover_image: file ? imageUrl : null,
        }, { withCredentials: true }) : await axios.post('/posts/', {
          title,
          content,
          category,
          cover_image: file ? imageUrl : ''
        }, { withCredentials: true });

        navigator(`/`);
      } catch (err) {
        console.log(err);
      }
    }
  }

  const countWordsTyped = (e) => {
    const newText = e.target.value;
    const wordCount = newText.trim().split(/\s+/).length;
    setCurrentWordsTyped(wordCount)

    if (wordCount >= 50) {
      setDisabled(false);
    } else {
      setDisabled(true)
    }
  }

  const countWords = (text) => {
    const words = text.trim().split(/\s+/);
    setCurrentWordsTyped(words.filter((word) => word !== '').length)
    if (words.filter((word) => word !== '').length >= 50) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }

  useEffect(() => {
    const count = () => countWords(content);
    count();

    const redirect = () => {
      if (!currentUser) {
        navigator('/login')
      }
    }

    redirect();
  }, [content, currentUser, navigator])

  return (
    <>
      <section className='mt-24 mb-10 text-white max-w-xl mx-auto lg:px-0 px-5'>
        <div>
          <button onClick={() => navigator('/')} className='py-1.5 px-3 font-normal rounded-md bg-secondary ring-1 ring-gray-700 text-gray-400 duration-500 text-base flex gap-1 items-center outline-none'>
            <IoArrowBackOutline />
            <div>
              My feed
            </div>
          </button>
        </div>

        <div className="mt-10">
          <h1 className="text-white text-2xl font-bold">New Post</h1>
          <form action='#' className="mt-5">
            <CategoryDropButton
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />

            <div className="mt-5 space-y-4">
              <div>
                <input type="file" className='hidden' id='imageUpload' ref={inputRef} onChange={(e) => setFile(e.target.files[0])} accept='image/*' required/>
                <div className="relative w-fit">
                  {file ? <div onClick={() => setFile(null)} className="absolute cursor-pointer -top-[10px] -right-[10px] h-[30px] w-[30px] text-dark bg-white rounded-full flex items-center justify-center">
                    <IoCloseOutline />
                  </div> : null}
                  <label htmlFor="imageUpload" className='w-[200px] h-[100px] overflow-hidden p-2 cursor-pointer rounded-xl ring-1 ring-gray-700 flex items-center justify-center bg-secondary'>
                    {file ? <img src={URL.createObjectURL(file)} width={'100%'} alt={file} /> : <div className="flex gap-2 items-center">
                      <IoCamera />
                      <h3 className='text-white font-semibold text-sm'>Thumbnail</h3>
                    </div>}
                  </label>
                </div>
              </div>
              <div>
                <input type={'text'} className='p-2 text-sm outline-none rounded-md bg-secondary ring-1 w-full box-border ring-gray-700 text-white' placeholder={'Post title'} value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>

              <div>
                <textarea value={content} onChange={(e) => {
                  setContent(e.target.value);
                  countWordsTyped(e)
                }} name="postContent" id="postContent" cols="30" rows="7" placeholder='Share your thoughts' required className='p-2 rounded-md text-sm bg-secondary ring-1 ring-gray-700 w-full outline-none'></textarea>
                {content.length >= 1 ? <small className='text-gray-400'>{currentWordsTyped} / 50 words typed.</small> : <small className='text-gray-400'>Number of words typed here must be more than 50</small>}
              </div>

              <div>
                <WhiteButton
                  onClick={handleCreatePost}
                  disabled={disabled}
                  text={'Create post'}
                />
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default CreatePost