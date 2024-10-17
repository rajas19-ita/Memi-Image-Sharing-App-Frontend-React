import { useEffect, useState } from "react";
import useAuth from "./useAuth";

function useFetchImages() {
    const [isLoading, setIsLoading] = useState(false);
    const [imagesData, setImagesData] = useState(null);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(4);
    const [refetch, setRefetch] = useState(false);
    const { user } = useAuth();

    const triggerRefetch = () => {
        setRefetch(!refetch);
    };

    useEffect(() => {
        const fetchImgs = async () => {
            try {
                const response = await fetch(
                    `http://localhost:4000/images/?page=${page}&pageSize=${pageSize}`,
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    }
                );

                const data = await response.json();
                if (!response.ok) {
                    throw data;
                }
                return data;
            } catch (error) {
                throw error.message ? error : { message: "An error occurred" };
            }
        };

        let ignore = false;
        let timeoutId = setTimeout(() => {
            setIsLoading(true);
            setError(null);

            fetchImgs()
                .then((data) => {
                    if (!ignore) {
                        setImagesData(data);
                        setIsLoading(false);
                    }
                })
                .catch((error) => {
                    if (!ignore) {
                        setError(error);
                        setImagesData(null);
                        setIsLoading(false);
                    }
                });
        }, 300);

        return () => {
            clearTimeout(timeoutId);
            ignore = true;
        };
    }, [page, pageSize, refetch]);

    return {
        isLoading,
        error,
        page,
        setPage,
        pageSize,
        setPageSize,
        imagesData,
        triggerRefetch,
    };
}

export default useFetchImages;
