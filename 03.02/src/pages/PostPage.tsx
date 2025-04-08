import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const fetchPost = async (id: string) => {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
    return res.data
}

const fetchUser = async (userId: number) => {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`)
    return res.data
}

export default function PostPage() {
    const { id } = useParams<{ id: string }>()

    const {
        data: post,
        isLoading: postLoading,
        isError: postError,
    } = useQuery({
        queryKey: ['post', id], // <--- includes id
        queryFn: () => fetchPost(id!),
        enabled: !!id,
    })

    const {
        data: user,
        isLoading: userLoading,
        isError: userError,
    } = useQuery({
        queryKey: ['user', post?.userId], // <--- includes userId
        queryFn: () => fetchUser(post!.userId),
        enabled: !!post?.userId,
    })

    if (postLoading || userLoading) return <p>Loading...</p>
    if (postError || userError) return <p>Error loading data.</p>

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <hr />
            <h3>Author:</h3>
            <p>{user.name} ({user.email})</p>
        </div>
    )
}
