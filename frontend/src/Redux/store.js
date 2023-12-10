import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

import { authReducer } from "./AuthReducer/reducer";
import { productReducer } from "./ProductReducer/reducer";

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({ authReducer: authReducer, productReducer: productReducer });
const persistedReducer = persistReducer(persistConfig, rootReducer)

let store = null;
if (import.meta.env.VITE_NODE_ENV){
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    store = legacy_createStore(persistedReducer, composeEnhancers(
        applyMiddleware(thunk)
    ));
} else {
    store = legacy_createStore(persistedReducer, applyMiddleware(thunk));
}


export default store;
export const persistor = persistStore(store)