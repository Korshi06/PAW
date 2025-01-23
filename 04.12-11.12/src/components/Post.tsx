import React from 'react';
import { useParams } from 'react-router-dom';
import postsData  from '../assets/postsData';

const posts = postsData;


const Post = () => {
    const { id } = useParams<{ id: string }>();
    const post = posts.find((p) => p.id === parseInt(id!));

    if (!post) {
        return <div>Post not found</div>;
    }

    return (
        <div className="post">
            <h1>{post.title}</h1>
            <p>{post.text}</p>
        </div>
    );
};

export default Post;