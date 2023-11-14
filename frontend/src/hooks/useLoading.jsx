import {useState, createContext, useContext} from "react";

const LoadingContext = createContext();

export function LoadingProvider({children}) {
    const [ isLoading, setIsLoading ] = useState(false);

    const showLoading = () => setIsLoading(true);
    const hideLoading = () => setIsLoading(false);

    const value = {
        isLoading,
        showLoading,
        hideLoading,
    }

    return (
        <LoadingContext.Provider value={value}>
            {children}
        </LoadingContext.Provider>
    );
}

export function useLoading() {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error("useLoading must be used within a LoadingProvider");
    }
    return context;
}