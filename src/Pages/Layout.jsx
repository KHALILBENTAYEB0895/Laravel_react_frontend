import { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

export default function Layout() {

    const {user} = useContext(AppContext)

    return(
       <>
        <header>
        <nav>
            <Link to="/" className="nav-link">Home</Link>

            {!user ? (
                <div className="space-x-4">
                    <Link to="/register" className="nav-link">Register</Link>
                    <Link to="/login" className="nav-link">Login</Link>
                </div>
                ) : (
                <div>
                    <p className="text-slate-400 text-m">Welcome back {user.name}</p>
                </div>
            )}
        </nav>
        </header>

        <main>
            <Outlet />
        </main>
       </>

    )   
}