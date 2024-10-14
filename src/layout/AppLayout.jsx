import { Outlet } from "react-router-dom";

function AppLayout() {
    return (
        <div className="container text-gray-950 mx-auto min-h-screen">
            <Outlet />
        </div>
    );
}

export default AppLayout;
