import { connect } from 'react-redux';
import { getCurrentProfile } from '../redux/modules/profiles';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';


function Home({getCurrentProfile, profiles: { profile }}) {
    
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    return (
        <div className="home">
            {profile === null ? (
                <div>
                    <h2>Now please create your profile</h2>
                    <Link to="/create-profile">Create Profile</Link>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    )
}

const mapStateToProps = (state) => ({
    profiles: state.profiles
});

/*
    1. In state.profiles,profiles is the reducer name in the root reducer and it's the name of the file
    where the reducer is defined.

    2. ({}) will give you an implicit return.

    3. { profile } will be the object that will be returned from the profiles reducer (in switch case).
*/ 

export default connect(mapStateToProps, { getCurrentProfile })(Home);