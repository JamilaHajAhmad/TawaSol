import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProfiles } from '../redux/modules/profiles';
import { getProfileImage } from '../utils';
import defaultImage from '../assets/default.jpg';
import '../css/Developers.css';

const Developers = ({ user, getProfiles, profiles: { profiles, loading } }) => {
    useEffect(() => {
        getProfiles();
    }, [ getProfiles ]);

    return (
        <div>
            {loading ? null : (
                <div className="container">
                    <div className="row">
                        {profiles.filter(profile => profile.user._id !== user._id).map(profile => {
                            return (
                                <div className='column' key={profile.user._id}>
                                    <Link className="card-link" to={`/profile/${profile.user._id}`}>
                                        <Developer profile={profile} />
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}

const Developer = ({ profile }) => {
    const [ image, setImage ] = useState(getProfileImage(profile.user._id));
    const [ error, setError ] = useState(false);

    function onError() {
        if (!error) {
            setError(true);
            setImage(defaultImage);
        }
    }
    return (
        <div className="card">
            <img className='card-image' src={image} onError={onError} alt="profile" />
            <div className="card-content">
                <h3>{profile.user.name}</h3>
                <p className="card-title">{profile.status}</p>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.users.user,
    profiles: state.profiles
});

export default connect(mapStateToProps, { getProfiles })(Developers);