import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import Landing from './Landing'
import Header from './Header';
import Register from './Users/Register';
import STORE from '../redux/store';

const App = () => {
    return (
        <Provider store={STORE}>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;