import { useEffect, useState } from "react";
import { Post } from "../../../types/post/Post";

const useFetchPosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);  

    useEffect(() => {
        const fetchPosts = () => {
            setLoading(true);
            fetch('api/posts')
            .then((res) => res.json())
            .then((data) => {
                setPosts(data.posts);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message || "An error occurred.");
                setLoading(false);
            })
        }

        fetchPosts();
    },[]);

    return { posts, loading, error };
}

export default useFetchPosts;