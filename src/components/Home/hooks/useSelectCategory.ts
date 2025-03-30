import { ChangeEvent, useState } from "react";

import { Post } from "../../../types/post/Post";

const useSelectCategory = (posts: Post[]) => {
    const [selectedCategory, setSelectedCategory] = useState('All');
  
    // Get all possible categories from posts
    const categories = posts.reduce((acc: string[], post) => {
      if (post.categories) {
        post.categories.forEach((category) => {
          if (!acc.includes(category.name)) {
            acc.push(category.name);
          }
        });
      }
      return acc;
    }, []);
  
    // Add "All" option to categories
    categories.unshift('All');

    // Filter posts by selected category
  const filteredPosts = selectedCategory === "All" ? posts : posts.filter((post) => post?.categories?.map(category => category.name).includes(selectedCategory));

    // Handle category change
    const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
    }; 

    return { selectedCategory, handleCategoryChange, categories, filteredPosts };
}

export default useSelectCategory;