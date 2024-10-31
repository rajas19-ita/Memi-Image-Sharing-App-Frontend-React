import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tagsApi = createApi({
    reducerPath: "tags",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4000/tags",
    }),
    endpoints(builder) {
        return {
            fetchTags: builder.query({
                query: ({ user, tagName, page, pageSize }) => {
                    return {
                        url: "/",
                        params: {
                            ...(tagName ? { tagName } : {}),
                            page,
                            pageSize,
                        },
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    };
                },
                transformResponse: (response) => {
                    return response.reduce((acc, tag) => {
                        acc[tag.id] = tag;
                        return acc;
                    }, {});
                },
            }),
            addTag: builder.mutation({
                query: ({ user, tagName }) => {
                    return {
                        url: "/add",
                        method: "post",
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ tagName }),
                    };
                },
            }),
        };
    },
});

export const { useFetchTagsQuery, useAddTagMutation } = tagsApi;
export { tagsApi };
