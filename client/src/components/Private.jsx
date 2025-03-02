import { Fragment } from "react";
import Sidebar from "./Sidebar";
import Spinner from './Spinner';
import { connect } from 'react-redux';
import { Navigate } from "react-router-dom";

const Private = ({component: Component, users: { isAuthenticated, loading }}) => {
    return (
        <Fragment>
            {loading ? <Spinner /> : isAuthenticated ? (
                <Fragment>
                    <Sidebar />
                    <Component />
                </Fragment>
            ) : <Navigate to="/login" />}
        </Fragment>
    )
}

const mapStateToProps = state => ({
    users: state.users
});

export default connect(mapStateToProps)(Private);