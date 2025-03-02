import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../redux/modules/users';
import '../css/Header.css';

function Header({users: { isAuthenticated }, logout}) {
    const links = (
        <div className="links">
                <Link className='link' to="/login">Log in</Link>
        </div>
    );
    const authLinks = (
        <div className="links">
            <Link onClick={logout} className='link' to="/">Log out</Link>
        </div>
    )
    return (
        <header>
            <img src={logo} alt="TawaSol" className='logo' />
            <>{isAuthenticated ? authLinks : links}</>
        </header>
    )
}

const mapStateToProps = state => ({
    users: state.users
});

export default connect(mapStateToProps, { logout})(Header);