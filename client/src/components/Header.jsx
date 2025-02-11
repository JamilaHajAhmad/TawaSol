import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import '../css/Header.css';
function Header() {
    return (
        <header>
            <img src={logo} alt="TawaSol" className='logo' />
            <div className="links">
                <Link className='link' to="/">Home</Link>
                <Link className='link' to="/about">About</Link>
                <Link className='link' to="/services">Services</Link>
                <Link className='link' to="/contact">Contact</Link>
            </div>
        </header>
    )
}

export default Header;