import { Fragment } from 'react';
import spinner from '../assets/spinner.gif';

const Spinner = () => {
    return (
        <Fragment>
            <img src={spinner} alt="Loading..." style={{width: '200px', margin: '100px auto', display: 'block'}} />
        </Fragment>
    );
}

export default Spinner;