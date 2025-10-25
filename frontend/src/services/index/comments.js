import api from "../api/axios";

export const createComment = async ({ token, desc, slug, parent, replyOnUser }) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        const { data } = await api.post("/comments", {
            desc,
            slug,
            parent,
            replyOnUser,
        }, config);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
}

export const updateComment = async ({ token, commentId, desc }) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        const { data } = await api.put(`/comments/${commentId}`, { desc }, config);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
}

export const deleteComment = async ({ token, commentId }) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        const { data } = await api.delete(`/comments/${commentId}`, config);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
}

export const getPostComments = async ({ slug }) => {
    try {
        const { data } = await api.get(`/comments/post/${slug}`);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
}
