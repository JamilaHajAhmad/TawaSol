import { useEffect } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";

const Alert = ({ alert }) => {
    useEffect(() => {
        if (alert.show) {
            switch (alert.type) {
                case "success":
                    toast.success(alert.message);
                    break;
                case "error":
                    toast.error(alert.message);
                    break;
                case "info":
                    toast.info(alert.message);
                    break;
                case "warning":
                    toast.warn(alert.message);
                    break;
                default:
                    toast(alert.message);
            }
        }
    }, [alert]); // Depend on alert state to trigger notifications

    return null; // No need to return an empty JSX fragment
};

const mapStateToProps = (state) => ({
    alert: state.alerts,
});

export default connect(mapStateToProps)(Alert);



