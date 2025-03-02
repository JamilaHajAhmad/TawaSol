import { api } from '../../utils';
import { showAlertMessage } from './alerts';


export const GET_POSTS = 'posts/GET_POSTS';
export const GET_POST = 'posts/GET_POST';
export const ADD_POST = 'posts/ADD_POST';
export const DELETE_POST = 'posts/DELETE_POST';
export const ADD_COMMENT = 'posts/ADD_COMMENT';
export const DELETE_COMMENT = 'posts/DELETE_COMMENT';
export const UPDATE_LIKES = 'posts/UPDATE_LIKES';
export const POST_ERROR = 'posts/POST_ERROR';

export const getPosts = () => async dispatch => {
    try {
        const res = await api.get('/api/posts');
        dispatch({ type: GET_POSTS, payload: res.data });
    } catch (error) {
        dispatch({ type: POST_ERROR, payload: { msg: error.response.statusText, status: error.response.status } });
    }
}

export const getPost = id => async dispatch => {
    try {
        const res = await api.get(`/api/posts/${id}`);
        dispatch({ type: GET_POST, payload: res.data });
    } catch (error) {
        dispatch({ type: POST_ERROR, payload: { msg: error.response.statusText, status: error.response.status } });
    }
}

export const addPost = formData => async dispatch => {
    try {
        const res = await api.post('/api/posts', formData);
        dispatch({ type: ADD_POST, payload: res.data });
        dispatch(showAlertMessage('Post Created Successfully', 'success'));
    } catch (error) {
        dispatch({ type: POST_ERROR, payload: { msg: error.response.statusText, status: error.response.status } });
    }
}

export const deletePost = id => async dispatch => {
    try {
        await api.delete(`/api/posts/${id}`);
        dispatch({ type: DELETE_POST, payload: id });
        dispatch(showAlertMessage('Post Deleted Successfully', 'success'));
    } catch (error) {
        dispatch({ type: POST_ERROR, payload: { msg: error.response.statusText, status: error.response.status } });
    }
}

export const addComment = (postId, formData) => async dispatch => {
    try {
        const res = await api.post(`/api/posts/comment/${postId}`, formData);
        dispatch({ type: ADD_COMMENT, payload: res.data });
        dispatch(showAlertMessage('Comment Added Successfully', 'success'));
    } catch (error) {
        dispatch({ type: POST_ERROR, payload: { msg: error.response.statusText, status: error.response.status } });
    }
}

export const deleteComment = (postId, commentId) => async dispatch => {
    try {
        await api.delete(`/api/posts/comment/${postId}/${commentId}`);
        dispatch({ type: DELETE_COMMENT, payload: commentId });
        dispatch(showAlertMessage('Comment Deleted Successfully', 'success'));
    } catch (error) {
        dispatch({ type: POST_ERROR, payload: { msg: error.response.statusText, status: error.response.status } });
    }
}

export const likePost = id => async dispatch => {
    try {
        const res = await api.put(`/api/posts/like/${id}`);
        dispatch({ type: UPDATE_LIKES, payload: { id, likes: res.data } });
    } catch (error) {
        dispatch({ type: POST_ERROR, payload: { msg: error.response.statusText, status: error.response.status } });
    }
}

export const unlikePost = id => async dispatch => {
    try {
        const res = await api.put(`/api/posts/unlike/${id}`);
        dispatch({ type: UPDATE_LIKES, payload: { id, likes: res.data } });
    } catch (error) {
        dispatch({ type: POST_ERROR, payload: { msg: error.response.statusText, status: error.response.status } });
    }
}

const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {}
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false
            }
        case GET_POST:
            return {
                ...state,
                post: payload,
                loading: false
            }
        case POST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case UPDATE_LIKES:
            return {
                ...state,
                posts: state.posts.map(post => post._id === payload.id ? { ...post, likes: payload.likes } : post),
                loading: false
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload),
                loading: false
            }
        case ADD_POST:
            return {
                ...state,
                posts: [payload, ...state.posts],
                loading: false
            }
        case ADD_COMMENT:
            return {
                ...state,
                post: { ...state.post, comments: payload },
                loading: false
            }
        case DELETE_COMMENT: 
            return {
                ...state,
                post: { ...state.post, comments: state.post.comments.filter(comment => comment._id !== payload) },
                loading: false
            }
        default:
            return state;
    }
}