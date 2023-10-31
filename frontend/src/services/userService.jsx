import axios from "axios";

export const getUser = () => {
    return localStorage.getItem("users")
        ? JSON.parse(localStorage.getItem("users"))
        : null;
}

export const login = async (email, password) => {
    const {data} = await axios.post("/api/users/login", {email, password});
    localStorage.setItem("users", JSON.stringify(data));
    return data;
}

export const logout = () => {
    localStorage.removeItem("users");
}

