import '../../css/BasicInfo.css';

function BasicInfo({ profile }) {
    return (
        <div className="basic-info">
            <div className="container">
                <p>&#10024; {profile.bio}</p>
            </div>
            <div className="container">
                <p>&#127968; {profile.location}</p>
            </div>
            <div className="container">
                <p>&#127758;{profile.country}</p>
            </div>
            <div className="container">
                { profile.skills ? (
                    profile.skills.map((skill, index) => (
                        <p key={index}>
                            &#9989; <span className="skill">{skill}</span>
                        </p>
                    ))
                ) : null }
            </div>
        </div>
    )

}

export default BasicInfo;