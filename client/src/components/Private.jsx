import Sidebar from "./Sidebar";

const Private = ({component: Component}) => {
    return (
        <div>
            <Sidebar />
            <Component />
        </div>
    );
}

export default Private;