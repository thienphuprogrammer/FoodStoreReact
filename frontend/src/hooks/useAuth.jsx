import {useState, useEffect, createContext, useContext} from 'react';
import * as userService from '../services/userService';
import {toast} from "react-toastify";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(userService.getUser());

    const login = async (username, password) => {
        try {
            const user = await userService.login(username, password);
            setUser(user);
            toast.success('Login successfully');
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const logout = () => {
        userService.logout();
        setUser(null);
        toast.success('Logout successfully');
    }

    useEffect(() => {
        const user = userService.getUser();
        setUser(user);
    }, []);

    const value = {
        user,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }

    return context;
}