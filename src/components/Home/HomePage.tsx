import { useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";

import useFetchPosts from "./hooks/useFetchPosts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Pagination from '../Pagination/Pagination';


const HomePage = () => {
  // Using the relativeTime plugin to format dates with 'fromNow' method
  dayjs.extend(relativeTime);
  // Custom hook to fetch posts
  const {posts, loading, error} = useFetchPosts();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(7);

  // Calculates indexes of posts which should be displayed on a page
  const postsToDisplay = posts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);
    
  return (
    <div className="home-page">
      {/* Loading icon */}
      {loading && <FontAwesomeIcon icon={faSpinner} />}
      {/* Error handling */}
      {error && <p>Error: {error}</p>}
      
      <div className="posts-container">
        {posts.length > 0 
          && postsToDisplay.map((post) => {
            return (
              <div key={post.id} className="post">
                <div className="post-header">
                  <div className="author-container">
                    <img src={post.author.avatar} alt={post.author.name} />
                    <p>{post.author.name}</p>
                  </div>
                  <p>{dayjs(post.publishDate).fromNow()}</p>
                </div>
          
                <h2>{post.title}</h2>
                <p>{post.summary}</p>

                {/* categories */}
                
                {post.categories && post.categories.length > 0 && (
                  <div className="categories">
                    {post.categories.map((category) => (
                      <div key={category.id} className="category">
                        {category.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          }
        )}
         {(!loading && !error && posts.length === 0) && <p>No posts available</p>}
      </div>

      {/* Pagination component */}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      /> 
    </div>
  );
}
export default HomePage;