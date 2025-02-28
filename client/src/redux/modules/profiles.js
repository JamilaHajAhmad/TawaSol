import { showAlertMessage } from './alerts';
import { api } from '../../utils';

export const GET_PROFILE = 'profiles/GET_PROFILE';
export const UPDATE_PROFILE = 'profiles/UPDATE_PROFILE';
export const PROFILE_ERROR = 'profiles/PROFILE_ERROR';
export const UPLOAD_IMAGE = 'profiles/UPLOAD_IMAGE';

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await api.get('/api/profiles/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: GET_PROFILE,
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
        const res = await api.post('/api/profiles/upload', formData);
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

const initialState = {
    profile: null,
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
