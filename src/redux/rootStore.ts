import { configureStore, Middleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import rootReducers from "./rootReducer";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();
const persistConfig = {
  key: "root",
  storage,
};
// middleware arrays  ----------------------------------*
const allMiddleware: Middleware[] = [];
// saga middleware
allMiddleware.push(sagaMiddleware);
// redux logger middleware
if (process.env.REACT_APP_ENV === "development") {
  allMiddleware.push(createLogger());
}
// end middleware    -----------------------------------*
const persistedReducer = persistReducer(persistConfig, rootReducers);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(...allMiddleware),
});

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
