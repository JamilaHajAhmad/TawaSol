import { formatDate } from "../../utils";
import '../../css/Experience.css';

const Experience = ({ profile, deleteExperience }) => {
    return (
        <div className="experience-container">
            {profile.experience.map(exp => (
                <div key={exp._id} className="experience">
                    {deleteExperience ? <i className='fas fa-trash trash-icon' onClick={() => deleteExperience(exp._id)}></i> : null}
                    <p>&#128188; {exp.current ? 'Working' : 'Worked'} as <b>{exp.title}</b> at <b>{exp.company}</b> {exp.location ? <span>at <b>{exp.location}</b></span> : null}</p>
                    <small>from {formatDate(exp.from)} to {exp.to ? formatDate(exp.to) : 'Now'}</small>
                </div>
            ))}
            {profile.experience.length === 0 ? (
                <div className="experience">
                    <p>No experience added</p>
                </div>
            ) : null}
        </div>
    )

}

export default Experience;