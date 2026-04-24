import React, { useEffect, useRef, useState } from "react";
import { 
    HiOutlineLocationMarker, 
    HiOutlineBell, 
    HiCheckCircle, 
    HiOutlineLogout, 
    HiOutlineEye, 
    HiOutlineChevronDown,
    HiOutlineChevronUp
} from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useColorBlind } from "../../context/ColorBlindContext";
import { usePredio } from "../../context/PredioContext";
import './TopBar.css';

function TopBar() {
    const navigate = useNavigate();
    const { isColorBlindMode, toggleColorBlindMode } = useColorBlind();
    const { predios, selectedPredioId, selectedPredio, setPredio, loadingPredios, predioError } = usePredio();
    const [localSelected, setLocalSelected] = useState(selectedPredioId);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
      setLocalSelected(selectedPredioId);
    }, [selectedPredioId]);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsDropdownOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedLabel = selectedPredio
      ? `Predio ${String(selectedPredio.id_predio).substring(0, 6).toUpperCase()} · ${selectedPredio.coordenadas || 'Coordenadas desconocidas'}`
      : loadingPredios
      ? 'Cargando predios...'
      : predioError
      ? 'Error al cargar predios'
      : 'Selecciona un predio';

    const dropdownDisabled = loadingPredios || predios.length === 0 || Boolean(predioError);

    const handlePredioToggle = () => {
      if (dropdownDisabled) return;
      setIsDropdownOpen((prev) => !prev);
    };

    const handlePredioSelect = (selectedId) => {
      setLocalSelected(selectedId);
      setPredio(selectedId);
      setIsDropdownOpen(false);
    };

    const irAlertas = () => {
        navigate('/alertas');
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <header className="topbar">
            <div className="topbar-left">
                <div className="selector-predio custom-dropdown" ref={dropdownRef}>
                    <HiOutlineLocationMarker className="icon-geo" />
                    <div className="selector-text">
                        <span className="label">PREDIO ACTIVO</span>
                        <button
                            type="button"
                            className={`predio-dropdown-button ${dropdownDisabled ? 'disabled' : ''}`}
                            onClick={handlePredioToggle}
                            aria-haspopup="listbox"
                            aria-expanded={isDropdownOpen}
                            disabled={dropdownDisabled}
                        >
                            <span className="predio-value">{selectedLabel}</span>
                            <span className="dropdown-control">
                                {isDropdownOpen ? <HiOutlineChevronUp /> : <HiOutlineChevronDown />}
                            </span>
                        </button>
                    </div>

                    {isDropdownOpen && (
                        <div className="dropdown-options" role="listbox" aria-activedescendant={localSelected}>
                            {loadingPredios && <div className="dropdown-placeholder">Cargando predios...</div>}
                            {!loadingPredios && predioError && <div className="dropdown-placeholder text-error">Error al cargar predios</div>}
                            {!loadingPredios && !predioError && predios.length === 0 && <div className="dropdown-placeholder">No hay predios disponibles</div>}
                            {!loadingPredios && !predioError && predios.map((predio) => (
                                <button
                                    key={predio.id_predio}
                                    type="button"
                                    onClick={() => handlePredioSelect(predio.id_predio)}
                                    className={`dropdown-option ${String(localSelected) === String(predio.id_predio) ? 'selected' : ''}`}
                                >
                                    <div className="option-info">
                                        <span className="option-title">{`Predio ${String(predio.id_predio).substring(0, 6).toUpperCase()}`}</span>
                                        <span className="option-subtitle">{predio.coordenadas || 'Coordenadas desconocidas'}</span>
                                    </div>
                                    <span className="option-meta">{String(predio.id_predio).substring(0, 8)}...</span>
                                </button>
                            ))}
                        </div>
                    )}
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

    <button className="notif-btn bg-gray-50 border border-gray-200 p-2 rounded-full text-xl text-gray-500 hover:bg-gray-100"
    onClick={irAlertas}>
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