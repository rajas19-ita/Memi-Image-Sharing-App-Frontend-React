import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "../thunks/userLogin";
import { userSignup } from "../thunks/userSignup";
import { appInit } from "../thunks/appInit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoading: false,
        data: null,
        error: null,
    },
    reducers: {
        logout(state, action) {
            state.data = null;
        },
    },
    extraReducers(builder) {
        builder.addCase(userLogin.pending, (state, action) => {
            state.isLoading = true;
            state.data = null;
            state.error = null;
        });
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.error = null;
        });
        builder.addCase(userLogin.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
        builder.addCase(appInit.fulfilled, (state, action) => {
            state.data = action.payload;
        });
        builder.addCase(userSignup.pending, (state, action) => {
            state.isLoading = true;
            state.data = null;
            state.error = null;
        });
        builder.addCase(userSignup.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.error = null;
        });
        builder.addCase(userSignup.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
    },
});

export const logoutMiddleware = (store) => (next) => (action) => {
    if (action.type === "user/logout") {
        localStorage.removeItem("user");
    }
    return next(action);
};

export const { logout } = userSlice.actions;

export const userReducer = userSlice.reducer;
