import { Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import UserGallery from "./pages/UserGallery";

function App() {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route path="/user/gallery" element={<UserGallery />} />
            </Route>
        </Routes>
    );
}

export default App;
