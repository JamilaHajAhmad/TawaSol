import { formatDate } from "../../utils";

const Experience = ({ profile, deleteExperience }) => {
    return (
        <div className="container">
            {profile.experience.map(exp => (
                <div key={exp._id} className="experience">
                    {deleteExperience ? <i className='fas fa-trash-alt fa-2x' onClick={deleteExperience(exp._id)}></i> : null}
                    <p>{exp.current ? 'Working' : 'Worked'} as <b>{exp.title}</b> at <b>{exp.company}</b> {exp.location ? <span>at <b>{exp.location}</b></span> : null}</p>
                    <small>from {formatDate(exp.from)} to {exp.to ? formatDate(exp.to) : 'Now'}</small>
                </div>
            ))}
            {profile.experience.length === 0 ? <p>No experience added</p> : null}
        </div>
    )

}

export default Experience;