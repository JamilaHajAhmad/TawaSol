import { Link } from "react-router-dom";
import '../css/Landing.css';

function Landing() {
    return (
        <section className="landing">
            <div className="overlay">
                <div className="content">
                    <h1>Welcome to TawaSol</h1>
                    <p>Your digital solution for a sustainable and environmentally friendly community</p>
                    <div className="buttons">
                        <Link to="/register" className="button sign-btn">Sign Up</Link>
                        <Link to="/login" className="button log-btn">Log in</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Landing;