import React, { useState, useEffect } from 'react';
import AlertBanner from "../Components/Dashboard/AlertBanner";
import StatCard from "../Components/Dashboard/StatCard";
import { HiBeaker, HiSun, HiChartBar } from "react-icons/hi";
import InteractiveMap from '../Components/Dashboard/InteractiveMap';
import ChartHumedad from '../Components/Charts/ChartHumedad';
import ChartConsumo from '../Components/Charts/ChartConsumo';
import { Loader2, AlertCircle } from "lucide-react";

export default function Home() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                // Simulamos la llamada al endpoint de telemetría actual
                const response = await fetch('/api/dashboard-stats.json');
                
                if (!response.ok) {
                    throw new Error("No se pudieron sincronizar los indicadores de campo.");
                }

                const data = await response.json();
                setStats(data);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    // --- Pantalla de Carga de toda la página ---
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
                <Loader2 className="animate-spin text-green-600 mb-4" size={48} />
                <p className="text-slate-500 font-bold animate-pulse">Iniciando sistemas de monitoreo...</p>
            </div>
        );
    }

    // --- Pantalla de Error (Estilos solicitados) ---
    if (error) {
        return (
            <div className="m-10 p-12 text-center bg-red-50 rounded-3xl border border-red-200 shadow-sm">
                <AlertCircle className="mx-auto text-red-500 mb-4" size={64} />
                <h2 className="text-2xl font-bold text-red-800 mb-2">Error de Conexión</h2>
                <p className="text-red-500/80 max-w-md mx-auto mb-6">
                    Error: {error} Verifica tu conexión a internet o el estado del servidor central.
                </p>
                <button 
                    onClick={() => window.location.reload()}
                    className="px-8 py-3 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition-all transform hover:scale-105"
                >
                    Reintentar Sincronización
                </button>
            </div>
        );
    }

    return (
        <div className="p-4 space-y-6 animate-in fade-in duration-1000">
            {/* Grid de 4 columnas para las tarjetas con datos dinámicos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Humedad del Suelo" 
                    value={stats?.soil_humidity || "0"} 
                    unit="%" 
                    icon={HiBeaker} 
                    colorClass="text-blue-500" 
                />
                <StatCard 
                    title="Temperatura de Ambiente" 
                    value={stats?.ambient_temp || "0"} 
                    unit="°C" 
                    icon={HiSun} 
                    colorClass="text-orange-500" 
                />
                <StatCard 
                    title="Evapotranspiración" 
                    value={stats?.evapotranspiration || "0"} 
                    unit="mm/día" 
                    icon={HiSun} 
                    colorClass="text-green-500" 
                />
                <StatCard 
                    title="Consumo de Agua" 
                    value={stats?.water_consumption || "0"} 
                    unit="m³" 
                    icon={HiChartBar} 
                    colorClass="text-orange-400" 
                />
            </div>

            {/* Mapa interactivo (Componente interno manejará su propia carga) */}
            <InteractiveMap />

            {/* Contenedor para los Gráficos Lado a Lado */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartHumedad />
                <ChartConsumo />
            </div>

            {/* Panel de Alertas */}
            <AlertBanner />
        </div>
    );
}