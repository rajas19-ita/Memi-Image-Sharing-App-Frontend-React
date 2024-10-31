import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userReducer, logout, logoutMiddleware } from "./slices/userSlice";
import { imagesApi } from "./apis/imagesApi";
import { tagsApi } from "./apis/tagsApi";

export const store = configureStore({
    reducer: {
        user: userReducer,
        [imagesApi.reducerPath]: imagesApi.reducer,
        [tagsApi.reducerPath]: tagsApi.reducer,
    },
    middleware: (getDefaultMiddlewate) => {
        return getDefaultMiddlewate()
            .concat(logoutMiddleware)
            .concat(imagesApi.middleware)
            .concat(tagsApi.middleware);
    },
});

setupListeners(store.dispatch);

export { logout };

export * from "./thunks/userLogin";
export * from "./thunks/userSignup";
export * from "./thunks/appInit";
export { useFetchImagesQuery, useAddImageMutation } from "./apis/imagesApi";
export { useFetchTagsQuery, useAddTagMutation } from "./apis/tagsApi";
