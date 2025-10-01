import { AnyAction, combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import {
    loginReducerData,
    signUpReducerData,
} from "./coreReducer";

const persistConfig = {
    key: "root",
    storage,
    version: 1,
};

const rootReducer = combineReducers({
    login: loginReducerData,
    signUp: signUpReducerData,
});

const persistedReducer = persistReducer<ReturnType<typeof rootReducer>, AnyAction>(
    persistConfig,
    rootReducer
);

export default persistedReducer;