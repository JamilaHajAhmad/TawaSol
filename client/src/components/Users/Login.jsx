import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { login } from "../../redux/modules/users";
import "../../css/Login.css";

function Login({ login, isAuthenticated }) {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        login(email, password);
    }

    return (
        <div className="login">
            <h1>Welcome Back to TawaSol!</h1>
            <form onSubmit={onSubmit}>
                <input type="email" placeholder="Enter your email" name="email" value={email} onChange={onChange} required />
                <input type="password" placeholder="Enter your password" name="password" value={password} onChange={onChange} required />
                <input type="submit" value="Sign in"/>
                <p>New to TawaSol? <Link to="/register">Sign Up</Link></p>
            </form>
        </div>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.users.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
