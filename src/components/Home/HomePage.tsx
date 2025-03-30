import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import useFetchPosts from "./hooks/useFetchPosts";
import Pagination from '../Pagination/Pagination';
import useSelectCategory from './hooks/useSelectCategory';
import usePagination from '../Pagination/hook/usePagination';



const HomePage = () => {
  // Using the relativeTime plugin to format dates with 'fromNow' method
  dayjs.extend(relativeTime);

  // Custom hook to fetch posts
  const {posts, loading, error} = useFetchPosts();

  // Custom hook to filter posts by category
  const { selectedCategory, handleCategoryChange, categories, filteredPosts } = useSelectCategory(posts);

  // Custom pagination hook
  const { postsToDisplay, postsPerPage, currentPage, setCurrentPage } = usePagination(filteredPosts);
    
  return (
    <div className="home-page">
      {/* Loading icon */}
      {loading && <FontAwesomeIcon icon={faSpinner} spin />}
      {/* Error handling */}
      {error && <p>Error: {error}</p>}

      {/* Category filter dropdown */}
      {!loading && 
        <div className="category-filter-container">
          <label htmlFor="category-filter">Filter by category:</label>
          <select onChange={handleCategoryChange} value={selectedCategory} name="category-filter" className="category-filter">
            {categories && categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      }
      
      <div className="posts-container">
        {filteredPosts?.length > 0 
          && postsToDisplay?.map((post) => {
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
      {(filteredPosts.length > postsPerPage) && (
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={filteredPosts.length}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        /> )}
    </div>
  );
}
export default HomePage;