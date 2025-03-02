import { useState } from "react";
import { connect } from "react-redux";
import { addComment } from "../../redux/modules/posts";
import '../../css/CommentForm.css';

const CommentForm = ({ postId, addComment }) => {
    const [text, setText] = useState("");
    const onSubmit = e => {
        e.preventDefault();
        addComment(postId, { text });
        setText("");
    }
    return (
        <div className="comment-form">
            <p>Leave a comment</p>
            <hr></hr>
            <form onSubmit={onSubmit}>
                <textarea name="text" placeholder="Leave a comment" value={text} onChange={e => setText(e.target.value)} required/>
                <input type="submit" value="Comment"/>
            </form>
        </div>
    )
}

export default connect(null, { addComment })(CommentForm);