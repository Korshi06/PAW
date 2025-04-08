import { Routes, Route, Link } from 'react-router-dom'
import PostList from './components/PostList'
import PostPage from './pages/PostPage'

function App() {
    return (
        <div>
            <nav>
                <Link to="/">Strona główna</Link>
            </nav>
            <Routes>
                <Route path="/" element={<PostList />} />
                <Route path="/posts/:id" element={<PostPage />} />
            </Routes>
        </div>
    )
}

export default App
