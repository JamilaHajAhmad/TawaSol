import { Link } from 'react-router-dom';
import '../css/Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Link className='sidebar-link' to="/home">Home</Link>
            <Link className='sidebar-link' to="/posts">Posts</Link>
            <Link className='sidebar-link' to="/developers">Developers</Link>
            <Link className='sidebar-link' to="/settings">Settings</Link>
        </div>
    );
}

export default Sidebar;