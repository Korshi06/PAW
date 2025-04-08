import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Link } from 'react-router-dom'

const fetchPosts = async () => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
    return res.data
}

export default function PostList() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    })

    if (isLoading) return <p>Ładowanie postów...</p>
    if (isError) return <p>Wystąpił błąd przy pobieraniu postów.</p>

    return (
        <div>
            <h1>Lista postów</h1>
            {data.map((post: any) => (
                <div key={post.id}>
                    <Link to={`/posts/${post.id}`}>
                        <h2>{post.title}</h2>
                    </Link>
                </div>
            ))}
        </div>
    )
}
