import { useEffect } from "react";
import { connect } from "react-redux";
import { useAlert } from "react-alert";

const Alert = ({ alert }) => {
    const showAlert = useAlert();
    useEffect(() => {
        if(alert.show) {
            showAlert.show(alert.message, { type: alert.type });
        }
    })

    return <></>; // Empty component
    /*
        1. This component is used to show alerts.
        It is connected to the redux store and listens for changes in the alert state.
        When the alert state changes, it shows an alert using the react-alert library.
        The alert state is an object with the following properties:
        - show: a boolean that indicates whether the alert should be shown or not.
        - message: the message to be shown in the alert.
        - type: the type of the alert. It can be one of the following: success, error, info, warning.
        The alert state is set in the redux store by dispatching an action.
        
        2. In jsx file you should return a component, you can't leave the file without return
    */ 
}

const connectToStore = connect(mapStateToProps); // Connect to the redux store

const mapStateToProps = (state) => ({ alert: state.alerts }); 

const connectedComponent = connectToStore(Alert);

export default connectedComponent;

/*
    There is a shortcut way to do the above:
    export default connect(mapStateToProps)(Alert);
*/
