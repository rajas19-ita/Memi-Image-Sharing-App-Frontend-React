import { useState } from "react";

function useLogin() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (userData) => {
        try {
            setError(null);
            setIsLoading(true);
            const response = await fetch("http://localhost:4000/users/login", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();
            if (!response.ok) {
                setError(data);
            }

            return data;
        } catch (error) {
            setError({ message: "An Error occurred" });
        } finally {
            setIsLoading(false);
        }
    };
    return [isLoading, login, error];
}

export default useLogin;
