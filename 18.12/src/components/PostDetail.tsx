import { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/styles/main.scss';

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
}

const PostDetail = ({ postId }: { postId: string }) => {
    const [post, setPost] = useState<Post | null>(null);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
            .then(response => {
                setPost(response.data);
                return axios.get(`https://jsonplaceholder.typicode.com/users/${response.data.userId}`);
            })
            .then(response => setUser(response.data))
            .catch(error => console.error(error));
    }, [postId]);

    if (!post || !user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <div className="post-detail">
                <h2>{post.title}</h2>
                <p>{post.body}</p>
                <div className="user-info">
                    <h3>Author: {user.name}</h3>
                    <p>Email: {user.email}</p>
                    <p>Username: {user.username}</p>
                </div>
            </div>
        </div>
    );
};

export default PostDetail;