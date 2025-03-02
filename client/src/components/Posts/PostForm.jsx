import { useState } from "react";
import { connect } from "react-redux";
import { addPost } from "../../redux/modules/posts";


const PostForm = ({ addPost }) => {
    const [text, setText] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        addPost({ text });
        setText("");
    }

    return (
        <div className="post-form">
            <p>Create a post</p>
            <hr/>
            <form onSubmit={onSubmit}>
                <div>
                    <textarea
                        name="text"
                        placeholder="What's on your mind?"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        required
                        style={{ resize: "none" }}
                    />
                </div>
                <input type="submit" value="Post" />
            </form>
        </div>
    );
}

export default connect(null, { addPost })(PostForm);