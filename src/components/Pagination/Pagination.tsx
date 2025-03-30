import { MouseEvent } from "react";
import { PaginationType } from "../../types/post/PaginationType";

const Pagination: React.FC<PaginationType> = ({
    postsPerPage,
    totalPosts,
    setCurrentPage,
    currentPage,
  }) => {
    // Added a simple pagination. If I had more time, I would add a previous and next buttons and I would make it more responsive by hiding some of the page numbers and adding ellipsis.
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    const paginate = (page: number, e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setCurrentPage(page);
    };

    return (
      <nav aria-label="Page navigation">
        <div className="pagination">
          {pageNumbers.map((page) => (
            <div
              key={page}
              className={`page-item-wrapper`}
            >
              <button
                onClick={(e) => paginate(page, e)}
                className={`${currentPage === page ? "active" : ""} page-item`}
              >
                {page}
              </button>
            </div>
          ))}
        </div>
      </nav>
    );
  };

  export default Pagination;