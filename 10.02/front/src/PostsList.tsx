import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Post } from './types';

const PostsList: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        fetch('http://localhost:3000/wpisy')
            .then(res => res.json())
            .then((data: Post[]) => setPosts(data))
            .catch(console.error);
    }, []);

    return (
        <>
            <h2>Blog – Lista Wpisów</h2>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <Link to={`/post/${post.id}`}>{post.tytul}</Link>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default PostsList;
