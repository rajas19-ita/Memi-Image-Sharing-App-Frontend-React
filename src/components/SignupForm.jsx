import Button from "./Button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import useSignup from "../hooks/useSignup";

function SignupForm() {
    const { dispatch } = useAuth();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const [isLoading, signup, error] = useSignup();

    const onSubmit = async (data) => {
        const response = await signup(data);
        if (!response || !response.user) {
            reset();
        } else {
            dispatch({
                type: "LOGIN",
                payload: { ...response.user, token: response.token },
            });
        }
    };

    return (
        <div className="w-full max-w-sm bg-white rounded-md p-8 flex flex-col gap-2 shadow-sky-300 shadow-sm">
            <h2 className="self-center text-3xl font-medium mb-4">
                Create Account
            </h2>
            <form
                className="flex flex-col gap-2"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="flex flex-col gap-1">
                    <label htmlFor="signupUname" className="text-gray-600">
                        username
                    </label>
                    <input
                        id="signupUname"
                        type="text"
                        {...register("username", {
                            required: "username is required",
                            minLength: {
                                value: 3,
                                message:
                                    "username must be min 3 characters long",
                            },
                            maxLength: {
                                value: 30,
                                message:
                                    "username must be max 30 characters long",
                            },
                        })}
                        className="border-2 py-1.5 px-2 rounded "
                    />
                    {errors.username && (
                        <p className="text-red-500 text-sm">
                            {errors.username.message}
                        </p>
                    )}
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="signupPassword" className="text-gray-600">
                        password
                    </label>
                    <input
                        id="signupPassword"
                        type="password"
                        {...register("password", {
                            required: "password is required",
                            minLength: {
                                value: 8,
                                message:
                                    "password must be min 8 characters long",
                            },
                        })}
                        className="border-2 py-1.5 px-2 rounded"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm">
                            {errors.password.message}
                        </p>
                    )}
                </div>
                <Button
                    type="submit"
                    className="justify-center mt-4 "
                    isLoading={isLoading}
                    primaryBtn
                >
                    Signup
                </Button>
            </form>
            {error && <p className="text-red-500">{error.message}</p>}
            <p className="self-end mb-1">
                Already have an account?{" "}
                <Link to={"/login"} className="text-sky-600 font-medium">
                    login
                </Link>
            </p>
        </div>
    );
}
export default SignupForm;
