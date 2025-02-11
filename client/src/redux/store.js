import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './modules';
/*
    1. Import the root reducer module we created earlier from the modules folder
    which will combine all the reducers into one

    2. When we import folder, it will automatically look for the index.js file in that folder and then
    import the file from there automatically so we don't have to specify the file name in the import statement
    and in our case here we are importing the rootReducer from the modules folder which will automatically
    import the index.js file from the modules folder
*/ 

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true
});

export default store;

/*
    1. We are using Redux Toolkit's configureStore function to create our Redux store.
    This function takes an object as its argument, which includes the root reducer and other options.

    - reducer: This is the single source of truth for the entire application. It's a pure function that takes the current state and an action as input and returns the next state.
    - devTools: If this is set to true, Redux DevTools will be enabled. It provides features like Redux state inspection, time travel, and much more.
    - middleware: This is an optional argument. It's an array of functions that add extra functionality to the Redux dispatch method. Here, we are using the getDefaultMiddleware() function to get the default middleware that comes with Redux Toolkit.
*/

