import { connect } from 'react-redux';
import { getProfileById } from '../redux/modules/profiles';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/Home.css';
import { getProfileImage } from '../utils';
import defaultImage from '../assets/default.jpg';
import BasicInfo from './ProfileInfo/BasicInfo';
import Education from './ProfileInfo/Education';
import Experience from './ProfileInfo/Experience';


function Profile({ getProfileById, profiles: { profile } }) {

    const [ image, setImage ] = useState("");
    const [ error, setError ] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        getProfileById(id);
        setImage(getProfileImage(id));
    }, [getProfileById, id]);

    function onError() {
        if (!error) {
            setError(true);
            setImage(defaultImage);
        }
    }

    return (
        <div className="home">
            {profile === null ? null : (
                <div className="home__profile">
                    <div className="row">
                        <div className="column">
                            <img src={image} alt="profile" onError={onError} />
                            <p>{profile.user.name}</p>
                        </div>
                        <div className="column">
                            <BasicInfo profile={profile} />
                            <div className="social">
                                {profile.social ? Object.keys(profile.social)
                                    .filter(media => profile.social[ media ] !== "")
                                    .map(media => {
                                        return (
                                            <a key={media} href={profile.social[ media ]} target="_blank" rel="noreferrer">
                                                <i className={`fab fa-${media} fa-2x`}></i>
                                            </a>
                                        )
                                    })
                                    : null}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <div className="container">
                                <h3>Education</h3>
                            </div>
                            <Education profile={profile} />
                        </div>
                        <div className="column">
                            <div className="container">
                                <h3>Experience</h3>
                            </div>
                            <Experience profile={profile} />
                        </div>
                    </div>
                </div>
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

export default connect(mapStateToProps, { getProfileById })(Profile);