import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../context/SessionContext";
import { UserIcon } from "@heroicons/react/16/solid";

export const Header = () => {
    const { userRole, isAuthenticated, isLoading, setIsAuthenticated } = useContext(SessionContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            navigate('/login');
        }
    }, [isAuthenticated, isLoading, navigate]);

    if (isLoading) {
        return <p>Cargando...</p>;
    }

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/login');
    }

    return (
        <header className="flex justify-between text-gray-800 items-center px-2 bg-[#EAF5F7] shadow-lg">
            <img
                className="w-16 py-2"
                src="/src/assets/images/LogoFvpc.png"
                alt="Logo"
            />
            <h1 className="hidden md:inline text-2xl">
                Fundación Vista para lo ciegos
            </h1>
            <div className="flex gap-2 items-center">
                <p className="hidden sm:inline mt-auto text-sm md:text-base lg:text-lg">{userRole}</p>
                <UserIcon className="size-6" />
                <button className="bg-black text-white font-medium text-sm rounded-lg p-2 hover:scale-105 transition-all duration-300"
                    onClick={logout}>Cerrar Sesion</button>
            </div>
        </header>
    )
}
