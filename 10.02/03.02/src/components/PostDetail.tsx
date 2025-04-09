import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

interface Post {
    id: number
    tytul: string
    tresc: string
    kategoria: {
        nazwa: string
    }
    komentarze: {
        id: number
        tresc: string
        autor: string
        dataDodania: string
    }[]
}

const PostDetail = () => {
    const { id } = useParams<{ id: string }>() // Use `useParams` to get the postId
    const [post, setPost] = useState<Post | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:3001/posts/${id}`)
                .then(res => {
                    setPost(res.data)
                })
                .catch(err => console.error('Error fetching post:', err))
                .finally(() => setLoading(false))
        }
    }, [id])

    if (loading) return <div>Loading...</div>
    if (!post) return <div>Post not found.</div>

    return (
        <div className="post-detail">
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
    )
}

export default PostDetail
