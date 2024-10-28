import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const imagesApi = createApi({
    reducerPath: "images",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4000/images",
    }),
    endpoints(builder) {
        return {
            fetchImages: builder.query({
                providesTags: (result, error, args) => {
                    return [`page${args.page}`];
                },
                query: ({ user, page, pageSize }) => {
                    return {
                        url: "/",
                        params: {
                            page,
                            pageSize,
                        },
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    };
                },
            }),
            addImage: builder.mutation({
                invalidatesTags: (result, error, args) => {
                    return ["page1"];
                },
                query: ({ user, formData }) => {
                    return {
                        url: "/add",
                        method: "post",
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                        body: formData,
                    };
                },
            }),
        };
    },
});

export const { useFetchImagesQuery, useAddImageMutation } = imagesApi;
export { imagesApi };
