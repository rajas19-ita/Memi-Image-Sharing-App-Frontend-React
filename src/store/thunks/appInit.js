import { createAsyncThunk } from "@reduxjs/toolkit";

const appInit = createAsyncThunk("app/init", async () => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.token) {
            const decodedJwt = JSON.parse(atob(user.token.split(".")[1]));
            if (decodedJwt.exp * 1000 < Date.now()) {
                localStorage.removeItem("user");
                throw { message: "Jwt expired" };
            }
            return user;
        }
    } catch (error) {
        throw error;
    }
});

export { appInit };
