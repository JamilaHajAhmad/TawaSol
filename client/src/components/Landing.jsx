import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import '../css/Landing.css';

function Landing() {
    return (
        <section className="landing">
            <div className="overlay">
                <div className="content">
                    <h1>Welcome to TawaSol</h1>
                    <Title />
                    <div className="buttons">
                        <Link to="/register" className="button sign-btn">Sign Up</Link>
                        <Link to="/login" className="button log-btn">Log in</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Title() {
    const TITLES = [
        'Connect, Share, and Engage Effortlessly',
        'A New Way to Connect with Your Community',
        'Your Community, Your Voice',
        'A Platform for Change',
    ];

    const [titleIndex, setTitleIndex] = useState(0);
    const [fadeIn, setFadeIn] = useState(true);
    useEffect(
        () => {
            const interval = setInterval(() => {
                setTitleIndex((titleIndex + 1) % TITLES.length);
                setFadeIn(true);
                setTimeout(() => setFadeIn(false), 2000);
            }, 4000);
            setTimeout(() => setFadeIn(false), 2000);
            return () => clearInterval(interval);
        }
    , [titleIndex, TITLES.length]);
    return <p className={`title ${fadeIn? 'title-fade-in': 'title-fade-out'}`}>{TITLES[titleIndex]}</p>
}

export default Landing;