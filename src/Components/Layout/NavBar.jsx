import { NavLink } from "react-router-dom";
// ✨ 1. Importamos un icono nuevo (HiOutlineShieldCheck) para el panel
import { HiOutlineLocationMarker, HiOutlineClock, HiOutlineBell, HiOutlineHome, HiOutlineShieldCheck} from "react-icons/hi"
import './NavBar.css'
import { LogoRiego } from "../../assets/logo";

function NavBar(){
    // ✨ 2. Obtenemos el rol actual y verificamos si tiene permiso
    const userRole = localStorage.getItem("rol");
    const isAdmin = ['organizador','Organizador'].includes(userRole);

    return(
        <nav className = "sidebar">
            <div className = "sidebar-logo">
                    <LogoRiego className="w-16 h-16" />
                <div className = "logo-text">
                    <h2> AgroRiego </h2>
                    <span> Sistema Inteligente</span>
                </div>
            </div>

            <ul className = "nav-links">
                <li>
                    <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
                        <HiOutlineHome className="icon" />
                        <span>Dashboard</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/areas" className={({ isActive }) => isActive ? "active" : ""}>
                        <HiOutlineLocationMarker className="icon" />
                        <span>Áreas de Riego</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/historial" className={({ isActive }) => isActive ? "active" : ""}>
                        <HiOutlineClock className="icon" />
                        <span>Historial</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/alertas" className={({ isActive }) => isActive ? "active" : ""}>
                        <HiOutlineBell className="icon" />
                        <span>Alertas</span>
                    </NavLink>
                </li>

                {/* ✨ 3. BOTÓN CONDICIONAL ✨ */}
                {/* Solo se dibuja si isAdmin es true */}
                {isAdmin && (
                    <li>
                        <NavLink to="/admin" className={({ isActive }) => isActive ? "active" : ""}>
                            <HiOutlineShieldCheck className="icon" />
                            <span>Panel Admin</span>
                        </NavLink>
                    </li>
                )}
            </ul>
        </nav>
    )
}
export default NavBar