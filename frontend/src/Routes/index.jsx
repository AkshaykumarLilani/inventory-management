import { useSelector } from "react-redux";
import axios from "axios";
import PrivateRoutes from "./PrivateRoutes";
import OpenRoutes from "./OpenRoutes";
import { useState } from "react";

const AllRoutes = () => {
    
    const token = useSelector(store => store.authReducer.token);
    const isAuthenticated = token ? true : false;

    if (isAuthenticated) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
    } else {
        axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
    }

    if (isAuthenticated) {
        return <PrivateRoutes />
    } else {
        return <OpenRoutes />
    }
}

export default AllRoutes;