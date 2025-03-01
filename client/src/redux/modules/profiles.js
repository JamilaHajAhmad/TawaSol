import { showAlertMessage } from './alerts';
import { api } from '../../utils';

export const GET_PROFILE = 'profiles/GET_PROFILE';
export const GET_PROFILES = 'profiles/GET_PROFILES';
export const UPDATE_PROFILE = 'profiles/UPDATE_PROFILE';
export const PROFILE_ERROR = 'profiles/PROFILE_ERROR';
export const UPLOAD_IMAGE = 'profiles/UPLOAD_IMAGE';
export const CLEAR_PROFILE = 'profiles/CLEAR_PROFILE';

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await api.get('/api/profiles/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
}

// Create or update profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const res = await api.post('/api/profiles', formData);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(showAlertMessage(edit ? 'Profile Updated Successfully' : 'Profile Created Successfully', 'success'));
        if (!edit) {
            history.push('/home');
        }
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(showAlertMessage(error.msg, 'error')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
}

export const uploadImage = (formData) => async dispatch => {
    try {
        const res = await api.post('/api/profiles/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        dispatch({
            type: UPLOAD_IMAGE,
            payload: res.data
        });
        dispatch(showAlertMessage('Image Uploaded Successfully', 'success'));
    } catch(error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
        dispatch(showAlertMessage('Image Upload Failed', 'error'));
    }
}

export const addExperience = (formData, history) => async dispatch => {
    try {
        const res = await api.put("/api/profiles/experience", formData);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(showAlertMessage('Experience Added Successfully', 'success'));
        history.push('/home');
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(showAlertMessage(error.msg, 'error')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
}

export const addEducation = (formData, history) => async dispatch => {
    try {
        const res = await api.put("/api/profiles/education", formData);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(showAlertMessage('Education Added Successfully', 'success'));
        history.push('/home');
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(showAlertMessage(error.msg, 'error')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
}

export const deleteExperience = (id) => async dispatch => {
    try {
        const res = await api.delete(`/api/profiles/experience/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(showAlertMessage('Experience Deleted Successfully', 'success'));
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
        dispatch(showAlertMessage(error.msg, 'error'));
    }
}

export const deleteEducation = (id) => async dispatch => {
    try {
        const res = await api.delete(`/api/profiles/education/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(showAlertMessage('Education Deleted Successfully', 'success'));
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
        dispatch(showAlertMessage(error.msg, 'error'));
    }
}

export const getProfileById = (userId) => async dispatch => {
    try {
        const res = await api.get(`/api/profiles/user/${userId}`);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
}

export const getProfiles = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    try {
        const res = await api.get('/api/profiles');
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
}

const initialState = {
    profile: null,
    profiles: [],
    loading: true,
    error: {},
    image: null
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            }
        case GET_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                loading: false
            }
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
                profile: null
            }
        case UPLOAD_IMAGE:
            return {
                ...state,
                image: payload
            }
        default:
            return state;
    }
}
