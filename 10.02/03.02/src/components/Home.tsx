import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// Adjust interface to match the data returned by your API
interface Post {
    id: number
    tytul: string // Change to 'tytul' to match backend field
    tresc: string // Change to 'tresc' to match backend field
}

function Home() {
    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {
        // Fetch posts from your backend (replace URL with your backend's endpoint)
        axios.get('http://localhost:3001/posts')
            .then(response => setPosts(response.data)) // Assuming your backend returns an array of posts
            .catch(error => console.error('Error fetching posts:', error))
    }, [])

    return (
        <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to the Blog!</h1>
            <p className="mb-6 text-lg">Explore posts and leave your thoughts in the comments.</p>

            {/* Loop through posts and display them */}
            <div>
                {posts.map(post => (
                    <div key={post.id} className="mb-4">
                        <Link to={`/posts/${post.id}`} className="text-xl text-blue-600 underline">
                            {post.tytul} {/* Display 'tytul' as the title */}
                        </Link>
                        <p className="mt-2 text-lg">{post.tresc}</p> {/* Display 'tresc' as the content */}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home
