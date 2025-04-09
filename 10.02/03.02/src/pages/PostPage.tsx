import { useParams } from 'react-router-dom'
import { usePost } from '../hooks/usePost'
import { useComments, useAddComment } from '../hooks/useComments'
import { useState } from 'react'

export default function PostPage() {
    const { id } = useParams<{ id: string }>()
    const { data: post, isLoading: postLoading } = usePost(id!)
    const { data: comments, isLoading: commentsLoading } = useComments(id!)
    const addComment = useAddComment(id!)
    const [text, setText] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (text.trim()) {
            addComment.mutate(text)
            setText('')
        }
    }

    if (postLoading || commentsLoading) return <p>Ładowanie...</p>

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>

            <hr />
            <h3>Komentarze</h3>
            <ul>
                {comments.map((c: any) => (
                    <li key={c.id}>{c.text}</li>
                ))}
            </ul>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="Dodaj komentarz"
                />
                <button type="submit">Dodaj</button>
            </form>
        </div>
    )
}
