import { Fragment, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile, uploadImage } from '../../redux/modules/profiles';
import '../../css/ProfileForm.css';

const initialState = {
    company: "",
    website: "",
    location: "",
    country: "",
    status: "",
    skills: "",
    bio: "",
    facebook: "",
    linkedin: "",
    instagram: "",
    github: ""
}

const ProfileForm = ({ profiles: { profile, loading }, createProfile, getCurrentProfile, uploadImage }) => {
    const [formData, setFormData] = useState(initialState);
    const [displaySocialInputs, toggleSocialInputs] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (!profile) getCurrentProfile();
        if (!loading && profile) {
            const profileData = { ...initialState };
            for (const key in profile) {
                if (key in profileData) profileData[key] = profile[key];
            }
            if (profile.social) {
                for (const key in profile.social) {
                    if (key in profileData) profileData[key] = profile.social[key];
                }
            }
            setFormData(profileData);
        }
    }, [loading, profile, getCurrentProfile]);

    const { company, website, location, country, status, skills, bio, facebook, linkedin, instagram, github } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onFileChange = e => {
        const data = new FormData();
        data.append('file', e.target.files[0]);
        uploadImage(data);
    }
    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, navigate, profile ? true : false);
    };

    return (
        <div className="profile-form">
            <h1>{profile ? 'Edit' : 'Create'} Your Profile</h1>
            <small>* = required field</small>
            <form onSubmit={onSubmit}>
                <select name="status" value={status} onChange={onChange}>
                    <option value="0">* Professional Status</option> 
                    <option value="Developer">Developer</option>
                    <option value="Junior Developer">Junior Developer</option>
                    <option value="Senior Developer">Senior Developer</option>
                    <option value="Manager">Manager</option>
                    <option value="Student">Student</option>
                    <option value="Instructor">Instructor</option>
                    <option value="Intern">Intern</option>
                    <option value="Other">Other</option>
                </select>
                <input type="file" name="file" onChange={onFileChange} />
                <input type="text" placeholder="Company" name="company" value={company} onChange={onChange} />
                <input type="text" placeholder="Website" name="website" value={website} onChange={onChange} />
                <input type="text" placeholder="Location" name="location" value={location} onChange={onChange} />
                <input type="text" placeholder="Country" name="country" value={country} onChange={onChange} />
                <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={onChange} />
                <input type='textarea' placeholder="A short bio of yourself" name="bio" value={bio} onChange={onChange} />
                <button onClick={() => toggleSocialInputs(!displaySocialInputs)} type="button">Social Accounts</button>
                {displaySocialInputs ? (
                    <Fragment>
                        <div>
                            <i className="fab fa-facebook fa-x"/><input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={onChange} />
                        </div>
                        <div>
                            <i className="fab fa-linkedin fa-x"/><input type="text" placeholder="LinkedIn URL" name="linkedin" value={linkedin} onChange={onChange} />
                        </div>
                        <div>
                            <i className="fab fa-instagram fa-x"/><input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={onChange} />
                        </div>
                        <div>
                            <i className="fab fa-github fa-x"/><input type="text" placeholder="Github URL" name="github" value={github} onChange={onChange} />
                        </div>
                    </Fragment>
                ) : <Fragment />}
                <div>
                    <input type="submit" value={profile ? 'Update Profile' : 'Create Profile'} />
                    <Link to="/home" className='link'>Go Back</Link>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    profiles: state.profiles
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile, uploadImage })(ProfileForm);