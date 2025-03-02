import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { likePost, unlikePost, deletePost } from '../../redux/modules/posts';
import { formatDate, getProfileImage } from '../../utils';


const PostItem = ({ 
    post: { _id, text, name, user, likes, comments, date },
    likePost,
    unlikePost,
    deletePost,
    users,
    showActions }) => {

        return (
            <div className="post-card">
                <div className="row">
                    <div className="column">
                        <img src={getProfileImage(user)} alt="profile" className="profile-image" />
                        <Link to={`/profiles/${user}`} className="profile-name">{name}</Link>
                    </div>
                    <div className="column">
                        <p>{text}</p>
                        <small>Posted at {formatDate(date)}</small>
                        {showActions && (
                            <div className="post-actions">
                                <button type="button" onClick={() => likePost(_id)}>
                                    <i className="fas fa-thumbs-up"></i>
                                    {likes.length > 0 && <span>{likes.length}</span>}
                                </button>
                                <button type="button" onClick={() => unlikePost(_id)}>
                                    <i className="fas fa-thumbs-down"></i>
                                </button>
                                <Link to={`/posts/${_id}`} className="comment-button">
                                    <i className="fas fa-comment"></i>
                                    {comments.length > 0 && <span>{comments.length}</span>}
                                </Link>
                                {user === users.user._id && (
                                    <div className="delete-button">
                                        <button type="button" onClick={() => deletePost(_id)}>
                                            <i className="fas fa-times"></i>
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
}

PostItem.defaultProps = { showActions: true };

const mapStateToProps = state => ({ users: state.users });

export default connect(mapStateToProps, { likePost, unlikePost, deletePost })(PostItem);