import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Landing from './Landing';
import Header from './Header';
import Register from './Users/Register';
import STORE from '../redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Alert from './Alert';
import Login from './Users/Login';
import Home from './Home';
import Private from './Private';
import ProfileForm from './ProfileForms/ProfileForm';
import AddExperience from './ProfileForms/AddExperience';
import AddEducation from './ProfileForms/AddEducation';
import { useEffect } from 'react';
import { loadUser } from '../redux/modules/users';
import { setAuthToken } from '../utils';
import Developers from './Developers';
import Profile from './Profile';
import Settings from './Settings';
import Posts from './Posts/Posts';

const App = () => {
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuthToken(token);
        }
        STORE.dispatch(loadUser());
    }, []);
    return (
        <Provider store={STORE}>
            <BrowserRouter>
                <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
                <Alert />
                <Header />
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<Private component={Home} />} />
                    <Route path="/create-profile" element={<Private component={ProfileForm} />} />
                    <Route path="/add-experience" element={<Private component={AddExperience} />} />
                    <Route path="/add-education" element={<Private component={AddEducation} />} />
                    <Route path="/developers" element={<Private component={Developers} />} />
                    <Route path="/profile/:id" element={<Private component={Profile} />} />
                    <Route path="/settings" element={<Private component={Settings} />} />
                    <Route path="/edit-profile" element={<Private component={ProfileForm} />} />
                    <Route path="/posts" element={<Private component={Posts} />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
};

export default App;
