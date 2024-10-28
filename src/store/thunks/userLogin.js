import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const userLogin = createAsyncThunk("user/login", async (credentials) => {
    try {
        const response = await axios.post("http://localhost:4000/users/login", {
            username: credentials.username,
            password: credentials.password,
        });

        const user = {
            ...response.data.user,
            token: response.data.token,
        };

        localStorage.setItem("user", JSON.stringify(user));

        return user;
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        } else {
            throw { message: "An error occurred" };
        }
    }
});

export { userLogin };
