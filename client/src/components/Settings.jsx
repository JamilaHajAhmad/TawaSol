import { connect } from "react-redux";
import { deleteAccount } from "../redux/modules/profiles";
import { Link } from "react-router-dom";
import '../css/Settings.css';

const Settings = ({ deleteAccount }) => {
    return (
        <div className="settings">
            <div className="setting-card">
                <p>To update your profile information, click on the Edit Profile button.</p>
                <Link to="/edit-profile" className="edit-profile-button">Edit Profile</Link>
            </div>
            <div className="setting-card">
                <p>To delete your account, click on the Delete Account button.</p>
                <button onClick={() => deleteAccount()}>Delete Account</button>
            </div>
        </div>
    )
}

export default connect(null, { deleteAccount })(Settings);