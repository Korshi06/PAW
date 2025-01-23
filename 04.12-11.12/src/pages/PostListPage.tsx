import React, { useEffect } from 'react';
import PostList from "../components/PostList";

interface PostListProps {
    setCurrentPage: (page: string) => void;
}

const PostListPage: React.FC<PostListProps> = ({ setCurrentPage }) => {
    useEffect(() => {
        setCurrentPage('Post List');
    }, [setCurrentPage]);

    return (
        <>
        <h1>Post List</h1>
        <PostList/>
        </>
    );
};

export default PostListPage;