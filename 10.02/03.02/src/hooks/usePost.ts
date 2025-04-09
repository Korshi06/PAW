import { useQuery } from '@tanstack/react-query'
import api from '../api'

export const usePost = (id: string) =>
    useQuery({
        queryKey: ['post', id],
        queryFn: async () => {
            const res = await api.get(`/posts/${id}`)
            return res.data
        },
        enabled: !!id,
    })
