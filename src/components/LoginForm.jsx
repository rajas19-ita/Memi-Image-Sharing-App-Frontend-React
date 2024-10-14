import Button from "./Button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useLogin from "../hooks/useLogin";
import useAuth from "../hooks/useAuth";

function LoginForm() {
    const { dispatch } = useAuth();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const [isLoading, login, error] = useLogin();
    const onSubmit = async (data) => {
        const response = await login(data);
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
            <h1 className="self-center text-3xl font-medium mb-4">
                mem<span className="text-sky-600 text-4xl">i</span>
            </h1>
            <form
                className="flex flex-col gap-2"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="flex flex-col gap-1">
                    <label htmlFor="loginUname" className="text-gray-600">
                        username
                    </label>
                    <input
                        id="loginUname"
                        type="text"
                        {...register("username", {
                            required: "username is required",
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
                    <label htmlFor="loginPassword" className="text-gray-600">
                        password
                    </label>
                    <input
                        id="loginPassword"
                        type="password"
                        {...register("password", {
                            required: "password is required",
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
                    primaryBtn
                    isLoading={isLoading}
                >
                    Login
                </Button>
            </form>
            {error && <p className="text-red-500">{error.message}</p>}
            <p className="self-end mb-1">
                Don't have an account?{" "}
                <Link to={"/signup"} className="text-sky-600 font-medium">
                    signup
                </Link>
            </p>
        </div>
    );
}

export default LoginForm;
