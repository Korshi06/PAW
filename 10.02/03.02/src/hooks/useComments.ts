import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../api'

export const useComments = (postId: string) =>
    useQuery({
        queryKey: ['comments', postId],
        queryFn: async () => {
            const res = await api.get(`/posts/${postId}/comments`)
            return res.data
        },
        enabled: !!postId, // Only fetch when postId is available
    })

export const useAddComment = (postId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (text: string) => {
            const res = await api.post(`/posts/${postId}/comments`, { text })
            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
    })
}
