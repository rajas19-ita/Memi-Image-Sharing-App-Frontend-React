import { createContext, useReducer, useEffect } from "react";

const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                user: action.payload,
                authDone: true,
            };
        case "LOGOUT":
            return {
                ...state,
                user: null,
            };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authDone: false,
    });

    useEffect(() => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (user && user.token) {
                const decodedJwt = JSON.parse(atob(user.token.split(".")[1]));
                if (decodedJwt.exp * 1000 < Date.now()) {
                    return localStorage.removeItem("user");
                }
                dispatch({ type: "LOGIN", payload: user });
            }
        } catch (error) {
            console.log("error");
        }
    }, []);

    useEffect(() => {
        if (!state.user) {
            if (state.authDone) {
                localStorage.removeItem("user");
            }
        } else {
            localStorage.setItem("user", JSON.stringify(state.user));
        }
    }, [state.user, state.authDone]);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
