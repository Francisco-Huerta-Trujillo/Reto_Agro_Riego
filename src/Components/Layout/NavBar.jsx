import { NavLink } from "react-router-dom";
import { HiOutlineLocationMarker, HiOutlineClock, HiOutlineBell, HiOutlineHome} from "react-icons/hi"
import './NavBar.css'

function NavBar(){
    return(
        <nav className = "sidebar">
            <div className = "sidebar-logo">
                <img src = "" alt = "AgroRiego Logo" />
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
            </ul>
        </nav>
    )
}
export default NavBar