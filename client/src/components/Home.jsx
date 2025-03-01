import { connect } from 'react-redux';
import { getCurrentProfile } from '../redux/modules/profiles';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Home.css';
import { getProfileImage } from '../utils';
import defaultImage from '../assets/default.jpg';


function Home({getCurrentProfile, profiles: { profile }, users: { user }}) {

    const [image, setImage] = useState("");
    const [error, setError] = useState(false);
    
    useEffect(() => {
        getCurrentProfile();
        if(user) {
            setImage(getProfileImage(user._id))
        }
    }, [getCurrentProfile, user]);

    function onError() {
        if(!error) {
            setError(true);
            setImage(defaultImage);
        }
    }

    return (
        <div className="home">
            {profile === null ? (
                <div>
                    <h2>Now please create your profile</h2>
                    <Link to="/create-profile" className='link'>Create Profile</Link>
                </div>
            ) : (
                <div className="home__profile">
                    <div className="column">
                        <img src={image} alt="profile" onError={onError} />
                        <p>{profile.user.name}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

const mapStateToProps = (state) => ({
    profiles: state.profiles,
    users: state.users
});

/*
    1. In state.profiles,profiles is the reducer name in the root reducer and it's the name of the file
    where the reducer is defined.

    2. ({}) will give you an implicit return.

    3. { profile } will be the object that will be returned from the profiles reducer (in switch case).
*/ 

export default connect(mapStateToProps, { getCurrentProfile })(Home);