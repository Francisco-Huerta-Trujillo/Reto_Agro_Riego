import { NavLink } from "react-router-dom";
import { HiViewGrid, HiLocationMarker, HiClock, HiBell} from "react-icons/hi"

function NavBar(){
    return(
        <nav className = "sidebar">
            <div className = "sidebar-logo">
                <img src = "" alt = "AgroRiego Logo" />
                <h2> AgroRiego </h2>
                <span> Sistema Inteligente</span>
            </div>

            <ul className = "nav-links">
                <li>
                    <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
                        <HiViewGrid className="icon" />
                        <span>Dashboard</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/areas" className={({ isActive }) => isActive ? "active" : ""}>
                        <HiLocationMarker className="icon" />
                        <span>Áreas de Riego</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/historial" className={({ isActive }) => isActive ? "active" : ""}>
                        <HiClock className="icon" />
                        <span>Historial</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/alertas" className={({ isActive }) => isActive ? "active" : ""}>
                        <HiBell className="icon" />
                        <span>Alertas</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}
export default NavBar