import { useState } from 'react';
import { connect } from 'react-redux';
import { addExperience } from '../../redux/modules/profiles';
import { Link } from 'react-router-dom';
import '../../css/AddExperience.css';
import { useNavigate } from 'react-router-dom';

function AddExperience({ addExperience }) {
    const [formData, setFormData] = useState({
        title: "",
        company: "",
        location: "",
        from: "",
        to: "",
        current: false,
    });

    const { title, company, location, from, to, current } = formData;
    const navigate = useNavigate();
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        addExperience(formData, navigate);
    }
    return (
        <div className="experience-form">
            <h1>Add Your Experience</h1>
            <small>* = required field</small>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="* Title" name="title" value={title} onChange={onChange} required />
                <input type="text" placeholder="* Company" name="company" value={company} onChange={onChange} required />
                <input type="text" placeholder="Location" name="location" value={location} onChange={onChange} />
                <label htmlFor="from">From Date</label>
                <input type="date" name="from" value={from} onChange={onChange} />
                <input type="checkbox" name="current" checked={current} value={current} onChange={() => setFormData({ ...formData, current: !current })} />{" "}
                <span>Current Job</span>
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

export default connect(null, { addExperience })(AddExperience);