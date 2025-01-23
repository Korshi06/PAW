import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import postsData from '../assets/postsData';


interface PostPageProps {
    setCurrentPage: (page: string) => void;
}

const PostPage: React.FC<PostPageProps> = ({ setCurrentPage }) => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const post = postsData.find((post) => post.id === parseInt(id!));

    useEffect(() => {
        if (post) {
            setCurrentPage(`Post ${post.title}`);
        }
    }, [post, setCurrentPage]);

    const redirectPage = () => {
        navigate('/PostList');
    };

    if (!post) {
        return (
            <div className="post-page">
                <h1>Post nie został znaleziony</h1>
                <button type="button" onClick={redirectPage}>
                    Powrót do listy
                </button>
            </div>
        );
    }

    return (
        <div className="post-page">
            <h1>{post.title}</h1>
            <p>{post.text}</p>
            <button type="button" onClick={redirectPage}>
                Retuen to the list
            </button>
        </div>
    );
};

export default PostPage;