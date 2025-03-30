export interface PaginationType {
    postsPerPage: number;
    totalPosts: number;
    setCurrentPage: (pageNumber: number) => void;
    currentPage: number;
}