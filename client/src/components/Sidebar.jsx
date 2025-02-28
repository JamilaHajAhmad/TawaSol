import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Link to="/home">Home</Link>
            <Link to="/posts">Posts</Link>
            <Link to="/developers">Developers</Link>
            <Link to="/settings">Settings</Link>
        </div>
    );
}

export default Sidebar;