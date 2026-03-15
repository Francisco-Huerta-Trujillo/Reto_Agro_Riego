import { HiOutlineLocationMarker, HiOutlineBell, HiCheckCircle } from "react-icons/hi";
import './TopBar.css';

function TopBar(){
    return(
        <header className = "topbar">
            <div className = "topbar-left">
                <div className = "selector-predio">
                    <HiOutlineLocationMarker className = "icon-geo" />
                    <div className = "selector-text">
                        <span className = "label"> PREDIO ACTIVO </span>
                        <select className="predio-dropdown">
                            <option>Predio 1</option>
                            <option>Predio 2</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="topbar-right">
                <div className="status-badge">
                    <div className="status-dot"></div>
                        <div className="status-info">
                            <span className="label"> ESTADO </span>
                            <span className="status-text"> Sistema Normal <HiCheckCircle className="check-icon" /></span>
                        </div>
                    <button className="notif-btn">
                        <HiOutlineBell />
                    </button>
                </div>
            </div>
        </header>
    )
}

export default TopBar