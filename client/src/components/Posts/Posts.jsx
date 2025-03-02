import { useEffect } from "react";
import { connect } from 'react-redux';
import { getPosts } from '../../redux/modules/posts';
import PostItem from './PostItem';
import PostForm from './PostForm';

const Posts = ({ getPosts, posts }) => {

    useEffect(() => {
        getPosts();
    }, [getPosts]);

    return (
        <div className="posts">
            <PostForm />
            {posts.map(post => (
                <PostItem key={post._id} post={post} />
            ))}
        </div>
    )
}

const mapStateToProps = state => ({
    posts: state.posts.posts
});

export default connect(mapStateToProps, { getPosts })(Posts);