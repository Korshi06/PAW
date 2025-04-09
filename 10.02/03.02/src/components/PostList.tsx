import React, { useEffect, useState } from "react";
import axios from "axios";

interface Comment {
    id: number;
    tresc: string;
    autor: string;
    dataDodania: string;
}

interface Post {
    id: number;
    tytul: string;
    tresc: string;
    kategoria: {
        nazwa: string;
    };
    komentarze: Comment[];
}

const PostsList = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("http://localhost:3001/posts");
                console.log("Posts fetched:", response.data);  // Log the response
                setPosts(response.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);


    if (loading) return <div>Loading...</div>;

    return (
        <div>
            {posts.length === 0 ? (
                <p>No posts available.</p>
            ) : (
                posts.map((post) => (
                    <div key={post.id}>
                        <h2>{post.tytul}</h2>
                        <p>{post.tresc}</p>
                        <p><strong>Category:</strong> {post.kategoria.nazwa}</p>
                        <h3>Comments</h3>
                        {post.komentarze.length === 0 ? (
                            <p>No comments yet.</p>
                        ) : (
                            post.komentarze.map((comment) => (
                                <div key={comment.id}>
                                    <p>{comment.tresc}</p>
                                    <p><em>- {comment.autor}</em></p>
                                </div>
                            ))
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default PostsList;
