import { useState } from 'react';
import { connect } from 'react-redux';
import { addEducation } from '../../redux/modules/profiles';
import { Link } from 'react-router-dom';
import '../../css/AddEducation.css';

function AddEducation({ addEducation, history}) {
    const [formData, setFormData] = useState({
        school: "",
        degree: "",
        fieldofstudy: "",
        from: "",
        to: "",
        current: false,
    });

    const { school, degree, fieldofstudy, from, to, current } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        addEducation(formData, history);
    }
    return (
        <div className="education-form">
            <h1>Add Your Education</h1>
            <small>* = required field</small>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="* School" name="school" value={school} onChange={onChange} required />
                <input type="text" placeholder="* Degree" name="degree" value={degree} onChange={onChange} required />
                <input type="text" placeholder="Field of Study" name="fieldofstudy" value={fieldofstudy} onChange={onChange} />
                <label htmlFor="from">From Date</label>
                <input type="date" name="from" value={from} onChange={onChange} />
                <input type="checkbox" name="current" checked={current} value={current} onChange={() => setFormData({ ...formData, current: !current })} />{" "}Current School
                <label htmlFor="to">To Date</label>
                <input type="date" name="to" value={to} onChange={onChange} disabled={current} />
                <input type="submit" value="Submit" />
                <Link to="/home" className='link'>Go Back</Link>
            </form>
        </div>
    );
}

export default connect(null, { addEducation })(AddEducation);