import { formatDate } from "../../utils";

const Education = ({profile, deleteEducation}) => {
    return (
        <div className="container">
            {profile.education.map(edu => (
                <div key={edu._id} className="education">
                    {deleteEducation ? <i className='fas fa-trash-alt fa-2x' onClick={() => deleteEducation(edu._id)}></i> : null}
                    <p>{edu.current ? 'Studying' : 'Studied'} <b>{edu.degree}</b> of <b>{edu.fieldofstudy}</b> at <b>{edu.school}</b></p>
                    <small>from {formatDate(edu.from)} to {edu.to ? formatDate(edu.to) : 'Now'}</small>
                </div>
            ))}
            {profile.education.length === 0 ? <p>No education added</p> : null}
        </div>
    )

}

export default Education;