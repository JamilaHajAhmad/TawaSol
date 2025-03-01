import { useState } from 'react';
import { connect } from 'react-redux';
import { addExperience } from '../../redux/modules/profiles';
import { Link } from 'react-router-dom';
import '../../css/AddExperience.css';

function AddExperience({ addExperience, history}) {
    const [formData, setFormData] = useState({
        title: "",
        company: "",
        location: "",
        from: "",
        to: "",
        current: false,
    });

    const { title, company, location, from, to, current } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        addExperience(formData, history);
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
                <input type="checkbox" name="current" checked={current} value={current} onChange={() => setFormData({ ...formData, current: !current })} />{" "}Current Job
                <label htmlFor="to">To Date</label>
                <input type="date" name="to" value={to} onChange={onChange} disabled={current} />
                <input type="submit" value="Submit" />
                <Link to="/home" className='link'>Go Back</Link>
            </form>
        </div>
    );
}

export default connect(null, { addExperience })(AddExperience);