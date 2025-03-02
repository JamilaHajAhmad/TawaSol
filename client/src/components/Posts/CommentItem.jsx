import { connect } from "react-redux";
import { formatDate, getProfileImage } from "../../utils";
import { deleteComment } from "../../redux/modules/posts";
import { Link } from "react-router-dom";


const CommentItem = ({ postId, comment: { _id, text, name, user, date }, users, deleteComment }) => {
    return (
        <div className="comment-card">
            <div className="row">
                <div className="column">
                    <img src={getProfileImage(user)} alt="profile" className="profile-image" />
                    <Link to={`/profiles/${user}`} className="profile-name">{name}</Link>
                </div>
                <div className="column">
                    <p>{text}</p>
                    <small>Commented at {formatDate(date)}</small>
                    <div className="comment-actions">
                        {user === users.user._id && (
                            <div className="delete-button">
                                <button type="button" onClick={() => deleteComment(postId, _id)}>
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({ users: state.users });

export default connect(mapStateToProps, { deleteComment })(CommentItem);