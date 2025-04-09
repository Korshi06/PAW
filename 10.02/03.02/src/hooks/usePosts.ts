import { useQuery } from '@tanstack/react-query'
import api from '../api'

export const usePosts = () =>
    useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await api.get('/posts')
            return res.data
        },
    })
