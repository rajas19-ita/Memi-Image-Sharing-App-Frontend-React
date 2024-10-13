import { Outlet } from "react-router-dom";

function AppLayout() {
    return (
        <div className="container bg-slate-50 mx-auto min-h-screen px-6">
            {<Outlet />}
        </div>
    );
}

export default AppLayout;
