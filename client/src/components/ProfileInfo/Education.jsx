import { formatDate } from "../../utils";
import '../../css/Education.css';

const Education = ({profile, deleteEducation}) => {
    return (
        <div className="education-container">
            {profile.education.map(edu => (
                <div key={edu._id} className="education">
                    {deleteEducation !== undefined ?
                        <a href="#" onClick={() => deleteEducation(edu._id)}><i className='fas fa-trash trash-icon'/></a> : null}
                    <p>&#x1F393; {edu.current ? 'Studying' : 'Studied'} <b>{edu.degree}</b> of <b>{edu.fieldofstudy}</b> at <b>{edu.school}</b></p>
                    <small>from {formatDate(edu.from)} to {edu.to ? formatDate(edu.to) : 'Now'}</small>
                </div>
            ))}
            {profile.education.length === 0 ? (
                <div className="education">
                    <p>No education added</p>
                </div>
            ) : null}
        </div>
    )

}

export default Education;