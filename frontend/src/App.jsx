import Header from "./components/Header/Header.jsx";
import AppRoutes from "./AppRoutes.jsx";
import Loading from "./components/Loading/Loading.jsx";
import {useLoading} from "./hooks/useLoading.jsx";
import {useEffect} from "react";
import setLoadingInterceptor from "./interceptors/loadingInterceptor.jsx";

function App() {
    const {showLoading, hideLoading} = useLoading();

    useEffect(() => {
        setLoadingInterceptor({showLoading, hideLoading});
    }, []);

    return (
        <div className="App">
            <Loading />
            <Header />
            <AppRoutes />
        </div>
    )
}

export default App
