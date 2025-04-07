import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Post, Comment } from './types';

const PostDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState<string>('');

    const postId = Number(id);

    useEffect(() => {
        fetch(`http://localhost:3000/wpisy/${postId}`)
            .then(res => res.json())
            .then((data: Post) => setPost(data));

        fetch(`http://localhost:3000/komentarze?wpisId=${postId}`)
            .then(res => res.json())
            .then((data: Comment[]) => setComments(data));
    }, [postId]);

    const handleAddComment = () => {
        if (!newComment.trim()) return;

        fetch('http://localhost:3000/komentarze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tresc: newComment, wpisId: postId })
        })
            .then(res => res.json())
            .then(() => {
                setNewComment('');
                return fetch(`http://localhost:3000/komentarze?wpisId=${postId}`);
            })
            .then(res => res.json())
            .then((data: Comment[]) => setComments(data));
    };

    if (!post) return <p>Ładowanie...</p>;

    return (
        <>
            <Link to="/">← Wróć do listy</Link>
            <h2>{post.tytul}</h2>
            <p>{post.tresc}</p>

            <h3>Komentarze</h3>
            <ul>
                {comments.map(k => (
                    <li key={k.id}>{k.tresc}</li>
                ))}
            </ul>

            <h4>Dodaj komentarz</h4>
            <textarea
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                placeholder="Napisz coś..."
            />
            <br />
            <button onClick={handleAddComment}>Dodaj</button>
        </>
    );
};

export default PostDetail;
