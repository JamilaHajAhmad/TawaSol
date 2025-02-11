/*
    Each module will have the following structure:
    1. Actions that are dispatched to the reducer
    2. Action creators that create the actions
    3. Reducer that updates the state based on the actions
*/

// Actions
const SHOW_ALERT_MESSAGE = 'alerts/SHOW_ALERT_MESSAGE';

// Action creators
export function showAlertMessage (message, type="info") {
    return function showAlertMessageThunk(dispatch) {
        dispatch({
            type: SHOW_ALERT_MESSAGE,
            payload: { 
                show: true,
                message,
                type 
            }
        });
    }
}
/*
    The showAlertMessage action creator returns a thunk that dispatches an action with the type SHOW_ALERT_MESSAGE. 
    The action has a payload object with the message and type properties.
    The payload object is used to pass data to the reducer and it contains the required information of the action.
    The thunk is a function that takes the dispatch function as an argument. It can be used to dispatch other actions asynchronously.
    The reducer then checks the type of the action and updates the state accordingly.
*/ 

// Reducer
const initialState = {
    show: false,
    message: '',
    type: 'info'
};
/* 
    The initialState object contains the initial state of the module.
    The state object is an object that contains the data for the module.
    The state object is passed to the reducer function as the first argument.
    The data in the state object is updated based on the actions that are dispatched.
    The data in the initialState object is the same as the data in the payload object of the action, but with default values.
*/
export default function reducer(state=initialState, action) {
    switch(action.type) {
        case SHOW_ALERT_MESSAGE:
            return {
                ...state,
                show: action.payload.show,
                message: action.payload.message,
                type: action.payload.type
            }
        default:
            return state;
    }
}

/*
    The reducer is a pure function that takes the current state and an action as arguments.
    The state argument is the state of the module, which is an object that contains the data for the module.
    The action argument is an object that contains the type and payload properties which is the action that was dispatched
    (object that was passed to the dispatch function).
    The reducer checks the type of the action and updates the state based on the action.
    The reducer returns a new state object with the updated data.
    The reducer should always return a new state object and not modify the existing state object.
    The reducer does not modify the existing state object, so we should copy the existing state object and update the data
    that needs to be updated using the spread operator(the last is used to copy the existing state object).
    
*/