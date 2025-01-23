import PostDetail from '../components/PostDetail';
import { useParams } from 'react-router-dom';

const PostPage = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div>
            <h1>Details</h1>
            <PostDetail postId={id!} />
        </div>
    );
};

export default PostPage;