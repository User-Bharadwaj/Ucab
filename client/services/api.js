import axios from "axios";

const normalizeApiBaseUrl = (baseUrl) => {
    const cleanedBaseUrl = baseUrl.trim().replace(/\/+$/, "");

    if (/\/api$/i.test(cleanedBaseUrl)) {
        return cleanedBaseUrl;
    }

    return `${cleanedBaseUrl}/api`;
};

const resolvedBaseUrl = normalizeApiBaseUrl(
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api"
);

const API = axios.create({
    baseURL: resolvedBaseUrl,
    withCredentials: true,
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else if (config.headers.Authorization) {
        delete config.headers.Authorization;
    }

    return config;
});

export default API;
