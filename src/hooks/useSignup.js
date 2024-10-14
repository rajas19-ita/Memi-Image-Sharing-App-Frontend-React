import { useState } from "react";

function useSignup() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const signup = async (userData) => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await fetch("http://localhost:4000/users/signup", {
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
    return [isLoading, signup, error];
}

export default useSignup;
