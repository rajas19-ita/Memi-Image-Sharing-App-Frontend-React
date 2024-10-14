import { Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import UserGallery from "./pages/UserGallery";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import useAuth from "./hooks/useAuth";
import { Navigate } from "react-router-dom";

function App() {
    const { user } = useAuth();
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route
                    path="/login"
                    element={
                        !user ? (
                            <LoginPage />
                        ) : (
                            <Navigate to={"/user/gallery"} replace />
                        )
                    }
                />
                <Route
                    path="/signup"
                    element={
                        !user ? (
                            <SignupPage />
                        ) : (
                            <Navigate to={"/user/gallery"} replace />
                        )
                    }
                />
                <Route
                    path="/user/gallery"
                    element={
                        user ? (
                            <UserGallery />
                        ) : (
                            <Navigate to={"/login"} replace />
                        )
                    }
                />
            </Route>
        </Routes>
    );
}

export default App;
