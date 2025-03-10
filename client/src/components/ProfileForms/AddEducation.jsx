import { useState } from 'react';
import { connect } from 'react-redux';
import { addEducation } from '../../redux/modules/profiles';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/AddEducation.css';

function AddEducation({ addEducation }) {
    const [formData, setFormData] = useState({
        school: "",
        degree: "",
        fieldofstudy: "",
        from: "",
        to: "",
        current: false,
    });

    const { school, degree, fieldofstudy, from, to, current } = formData;
    const navigate = useNavigate();
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        addEducation(formData, navigate);
    }
    return (
        <div className="education-form">
            <h1>Add Your Education</h1>
            <small>* = required field</small>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="* School" name="school" value={school} onChange={onChange} required />
                <input type="text" placeholder="* Degree" name="degree" value={degree} onChange={onChange} required />
                <input type="text" placeholder="* Field of Study" name="fieldofstudy" value={fieldofstudy} onChange={onChange} required />
                <label htmlFor="from">From Date</label>
                <input type="date" name="from" value={from} onChange={onChange} />
                <input type="checkbox" name="current" checked={current} value={current} onChange={() => setFormData({ ...formData, current: !current })} />{" "}
                <span>Current School</span>
                <label htmlFor="to">To Date</label>
                <input type="date" name="to" value={to} onChange={onChange} disabled={current} />
                <div className="actions">
                    <input type="submit" value="Submit" />
                    <Link to="/home" className='link'>Go Back</Link>
                </div>
            </form>
        </div>
    );
}

export default connect(null, { addEducation })(AddEducation);