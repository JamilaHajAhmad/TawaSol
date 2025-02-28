import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { register } from "../../redux/modules/users";
import { showAlertMessage } from "../../redux/modules/alerts";
import "../../css/Register.css";

function Register({ register, showAlertMessage }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const { name, email, password, confirmPassword } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            showAlertMessage("Passwords do not match", "error");
        }
        else {
            register({ name, email, password });
        }
    }
    /*
        1. onSubmit is async because we are calling an async function (register) inside it.
        We are using async/await to wait for the register function to complete before proceeding.
        This is important because we want to make sure that the user is registered before we redirect them to the page.
        
        2. e.preventDefault() is called to prevent the default form submission behavior.
        This is important because we want to handle the form submission ourselves, using the register function.
        We don't want the form to submit in the traditional way, because that would cause the page to reload.
    */

    return (
        <div className="register">
            <h1>Join TawaSol – Connect, Share, and Inspire!</h1>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Enter your name" name="name" value={name} onChange={onChange} />
                <input type="email" placeholder="Enter your email" name="email" value={email} onChange={onChange} />
                <input type="password" placeholder="Enter your password" name="password" value={password} onChange={onChange} />
                <input type="password" placeholder="Confirm your password" name="confirmPassword" value={confirmPassword} onChange={onChange} />
                <input type="submit" value="Sign Up"/>
                <p>Already have an account? <Link to="/login">Log in</Link></p>
            </form>
        </div>
    )
}

Register.propTypes = {
    register: PropTypes.func.isRequired,
    showAlertMessage: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.users.isAuthenticated
});


export default connect(mapStateToProps, { register, showAlertMessage })(Register);
/*
    This is a basic implementation of a registration form using React and Redux.
    The form includes fields for name, email, password, and confirm password.
    The `onChange` function updates the form data as the user types.
    The `onSubmit` function is currently empty, but it should handle form submission,
    including validation and dispatching the `register` action.
    The `mapStateToProps` function maps the `isAuthenticated` state to props,
    which can be used to redirect the user after successful registration.
    The `connect` function from `react-redux` is used to connect the component to the Redux store.
    The `register` and `showAlertMessage` actions are also passed as props.

    => <input></input>: if you add the input tag like this, React will throw an exception.
    The exception will be like this:
    input is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.

*/