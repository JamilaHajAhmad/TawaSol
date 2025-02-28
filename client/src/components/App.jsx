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

const App = () => {
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
                </Routes>
            </BrowserRouter>
        </Provider>
    );
};

export default App;
