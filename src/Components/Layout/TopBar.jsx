import React, { useEffect, useState } from "react";
import { 
    HiOutlineLocationMarker, 
    HiOutlineBell, 
    HiCheckCircle, 
    HiOutlineLogout, 
    HiOutlineEye // Nuevo icono para accesibilidad/daltonismo
} from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useColorBlind } from "../../context/ColorBlindContext";
import { usePredio } from "../../context/PredioContext";
import './TopBar.css';

function TopBar() {
    const navigate = useNavigate();
    const { isColorBlindMode, toggleColorBlindMode } = useColorBlind();
    const { predios, selectedPredioId, setPredio, loadingPredios, predioError } = usePredio();
    const [localSelected, setLocalSelected] = useState(selectedPredioId);

    useEffect(() => {
      setLocalSelected(selectedPredioId);
    }, [selectedPredioId]);

    const handlePredioChange = (event) => {
      const selectedId = event.target.value;
      setLocalSelected(selectedId);
      setPredio(selectedId);
    };


    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <header className="topbar">
            <div className="topbar-left">
                <div className="selector-predio">
                    <HiOutlineLocationMarker className="icon-geo" />
                    <div className="selector-text">
                        <span className="label"> PREDIO ACTIVO </span>
                        <select
                            className="predio-dropdown"
                            value={localSelected}
                            onChange={handlePredioChange}
                            disabled={loadingPredios || predios.length === 0}
                        >
                            {loadingPredios && <option value="">Cargando predios...</option>}
                            {!loadingPredios && predioError && <option value="">Error al cargar</option>}
                            {!loadingPredios && !predioError && predios.length === 0 && <option value="">No hay predios</option>}
                            {!loadingPredios && !predioError && predios.map((predio) => (
                                <option key={predio.id} value={predio.id}>
                                    {predio.name || predio.nombre || predio.label || predio.id}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="topbar-right">
                <div className="status-badge flex items-center gap-3 border border-gray-100 p-2 px-4 rounded-xl">
    <div className={`status-dot w-2 h-2 rounded-full shadow-sm bg-status-ok shadow-status-ok`}></div>
    <div className="status-info flex flex-col">
        <span className="label text-[10px] font-bold text-gray-400">ESTADO</span>
        <span className="status-text text-sm font-bold text-status-ok flex items-center gap-1">
            Sistema Normal <HiCheckCircle />
        </span>
    </div>
    
    {/* Botón Modo Daltonismo con Tailwind */}
    <button 
        onClick={toggleColorBlindMode}
        className={`p-2 rounded-full border transition-all duration-300 text-xl
            ${isColorBlindMode 
                ? 'bg-slate-800 border-slate-900 text-white shadow-inner translate-y-px' 
                : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-200'}`}
        title="Modo Daltonismo"
    >
        <HiOutlineEye />
    </button>

    <button className="notif-btn bg-gray-50 border border-gray-200 p-2 rounded-full text-xl text-gray-500 hover:bg-gray-100">
        <HiOutlineBell />
    </button>
</div>

                <div className="user-actions">
                    <button onClick={handleLogout} className="logout-btn" title="Cerrar Sesión">
                        <HiOutlineLogout />
                        <span>Salir</span>
                    </button>
                </div>
            </div>
        </header>
    );
}

export default TopBar;