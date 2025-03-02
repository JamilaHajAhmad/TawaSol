import { Link } from 'react-router-dom';
import '../css/Sidebar.css';
import { useState, useEffect } from 'react';
import { getProfileImage } from '../utils';
import { getCurrentProfile } from '../redux/modules/profiles';
import { connect } from 'react-redux';
import defaultImage from '../assets/default.jpg';

const Sidebar = ({ getCurrentProfile, users: { user } }) => {
    const [ image, setImage ] = useState("");
    const [ error, setError ] = useState(false);

    useEffect(() => {
        getCurrentProfile();
        if (user) {
            setImage(getProfileImage(user._id))
        }
    }, [ getCurrentProfile, user ]);

    function onError() {
        if (!error) {
            setError(true);
            setImage(defaultImage);
        }
    }

    return (
        <div className="sidebar">
            <Link to="/home">
                <img src={image} alt="profile" onError={onError} />
            </Link>
            <Link className='sidebar-link' to="/home">Home</Link>
            <Link className='sidebar-link' to="/posts">Posts</Link>
            <Link className='sidebar-link' to="/developers">Developers</Link>
            <Link className='sidebar-link' to="/settings">Settings</Link>
        </div>
    );
}

const mapStateToProps = state => ({ users: state.users });

export default connect(mapStateToProps, { getCurrentProfile })(Sidebar);