import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const userSignup = createAsyncThunk("user/signup", async (user) => {
    try {
        const response = await axios.post(
            "http://localhost:4000/users/signup",
            user
        );

        user = {
            ...response.data,
            token: response.data.token,
        };

        localStorage.setItem("user", JSON.stringify(user));

        toast.success("Account created successfully!", {
            position: "top-center",
            autoClose: 2000,
        });

        return user;
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        } else {
            throw { message: "An error occurred" };
        }
    }
});

export { userSignup };
