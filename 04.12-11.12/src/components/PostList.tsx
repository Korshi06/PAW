import React from 'react';
import { Link } from 'react-router-dom';
import postsData from '../assets/postsData';

interface Post {
    id: number;
    title: string;
    text: string;
}

const PostList = () => {
    const posts: Post[] = postsData;

    return (
        <div className="post-list">
            {posts.map((post: Post) => (
                <div key={post.id} className="post">
                    <h2>
                        <Link to={`/post/${post.id}`}>{post.title}</Link>
                    </h2>
                    <p>{post.text}</p>
                </div>
            ))}
        </div>
    );
};

export default PostList;