import { Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import UserGallery from "./pages/UserGallery";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { appInit } from "./store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

function App() {
    const user = useSelector((state) => state.user.data);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(appInit());
    }, []);

    return (
        <>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route
                        path="/"
                        element={
                            !user ? (
                                <Navigate to={"/login"} replace />
                            ) : (
                                <Navigate to={"/user/gallery"} replace />
                            )
                        }
                    />
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
            <ToastContainer />
        </>
    );
}

export default App;
