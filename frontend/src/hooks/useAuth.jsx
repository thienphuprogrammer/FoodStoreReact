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
            toast.error(error.response.data);
        }
    }

    const register = async (registerData) => {
        try {
            const user = await userService.register(registerData);
            setUser(user);
            toast.success('Register successfully');
        } catch (error) {
            toast.error(error.response.data);
        }
    }

    const logout = () => {
        userService.logout();
        setUser(null);
        toast.success('Logout successfully');
    }

    const updateProfile = async (updateData) => {
        const updatedUser = await userService.updateProfile(updateData);
        toast.success('Update profile successfully');
        if (updatedUser) {
            setUser(updatedUser);
        }
    }

    const changePassword = async (passwords) => {
        try {
            await userService.changePassword(passwords);
            logout();
            toast.success('Change password successfully');
        } catch (error) {
            toast.error(error.response.data);
        }
    }

    useEffect(() => {
        const user = userService.getUser();
        setUser(user);
    }, []);

    const value = {
        user,
        login,
        logout,
        register,
        updateProfile,
        changePassword,
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