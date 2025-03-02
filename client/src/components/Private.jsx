import Sidebar from "./Sidebar";
import Spinner from './Spinner';
import { connect } from 'react-redux';
import { Navigate } from "react-router-dom";

const Private = ({component: Component, users: { isAuthenticated, loading }}) => {
    return (
        <>
            {loading ? <Spinner /> : isAuthenticated ? (
                <>
                    <Sidebar />
                    <Component />
                </>
            ) : <Navigate to="/login" />}
        </>
    )
}

const mapStateToProps = state => ({
    users: state.users
});

export default connect(mapStateToProps)(Private);