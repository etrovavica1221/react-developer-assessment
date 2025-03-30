import { useState } from "react";

import { Post } from "../../../types/post/Post";

const usePagination =(filteredPosts: Post[]) =>{
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(7);
    
    // Calculates indexes of posts which should be displayed on a page
    const postsToDisplay = filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

    return {
        postsToDisplay,
        postsPerPage,
        currentPage,
        setCurrentPage,
    }
}

export default usePagination;