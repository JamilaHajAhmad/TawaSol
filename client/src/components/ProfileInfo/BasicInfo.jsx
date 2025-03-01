function BasicInfo({ profile }) {
    return (
        <div className="basic-info">
            <div className="container">
                <p>{profile.bio}</p>
            </div>
            <div className="container">
                <p>{profile.location}</p>
            </div>
            <div className="container">
                <p>{profile.country}</p>
            </div>
            <div className="container">
                { profile.skills ? (
                    profile.skills.map((skill, index) => (
                        <p key={index}>
                            <span className="skill">{skill}</span>
                        </p>
                    ))
                ) : null }
            </div>
        </div>
    )

}

export default BasicInfo;