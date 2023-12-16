import React, { useEffect, useState } from 'react'
import CategoryModal from '../utils/categoryFilterModal'
import PostCard from '../components/postCard'
import moment from 'moment'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
  const [posts, setPosts] = useState([]);
  const category = useLocation().search;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`/posts${category}`);
        setPosts(response.data.data);
      } catch (err) {
        console.log(err);
      } 
    }
    fetchPosts();
  }, [category]);

  return (
    <>
      <section className='max-w-7xl h-full mx-auto lg:px-0 md:px-3 mt-24 pb-5'>
        <CategoryModal />

        {posts.length === 0 ? <div className='h-[70vh] w-full flex items-center justify-center font-semibold text-gray-400 text-4xl'>
          No posts found
        </div> : <div className="mt-5 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:mx-0 mx-5 grid-cols-1 gap-4">
          {posts.map((data, index) => {
            const { post_id, content, full_name, created_at, title, category, cover_image, profile_image  } = data;

            return (
              <PostCard
                key={index}
                detail={content}
                userName={full_name}
                profileImage={profile_image === null ? null : `../upload/${profile_image}`}
                title={title}
                topic={category}
                postTime={moment(created_at).fromNow()}
                path={`/post/${post_id}`}
                coverPhoto={`../upload/${cover_image}`}
              />
            )
          })}
        </div>}
      </section>
    </>
  )
}

export default Home