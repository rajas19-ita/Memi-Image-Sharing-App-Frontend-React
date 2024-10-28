import Button from "./Button";
import { PiSignOutBold } from "react-icons/pi";

import { useDispatch } from "react-redux";
import { logout } from "../store";

function Navbar() {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <header className="px-6 py-3 bg-sky-100 flex items-center justify-between">
            <h1 className="self-center text-3xl font-medium mb-1">
                mem<span className="text-sky-600 text-4xl">i</span>
            </h1>
            <Button onClick={handleLogout} secondaryBtn>
                <PiSignOutBold size={19} /> Logout
            </Button>
        </header>
    );
}

export default Navbar;
