import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getPost } from '../../redux/modules/posts';
import PostItem from "./PostItem";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const Post = ({ getPost, posts: { post, loading } }) => {
    const { id } = useParams();
    useEffect(() => { getPost(id); }, [ getPost, id ]);
    return loading || post === null ? null : (
        <div className="container">
            <div className="post">
                <PostItem post={post} showActions={false} />
            </div>
            <CommentForm postId={post._id} />
            <div className="comments">
                {post.comments.map(comment => (
                    <CommentItem key={comment._id} comment={comment} postId={post._id} />
                ))}
            </div>
        </div>
    );
}

const mapStateToProps = state => ({ posts: state.posts });

export default connect(mapStateToProps, { getPost })(Post);