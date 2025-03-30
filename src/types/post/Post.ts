export interface Post {
    id: string;
    title: string;
    summary: string;
    author: Author;
    categories: Category[] | null;
    publishDate: string;
}

export interface Author {
    name: string;
    avatar: string;
}

export interface Category {
    id: string;
    name: string;
}
