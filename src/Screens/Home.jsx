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

    // --- Pantalla de Carga (Color dinámico: ahora usa status-ok / azul en daltónico) ---
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
                <Loader2 className="animate-spin text-status-ok mb-4" size={48} />
                <p className="text-slate-500 font-bold animate-pulse">Iniciando sistemas de monitoreo...</p>
            </div>
        );
    }

    // --- Pantalla de Error (Usa status-error / naranja-bermellón en daltónico) ---
    if (error) {
        return (
            <div className="m-10 p-12 text-center bg-status-error/10 rounded-3xl border border-slate-300 border-status-error/20 shadow-xl">
                <AlertCircle className="mx-auto text-status-error mb-4" size={64} />
                <h2 className="text-2xl font-bold text-status-error mb-2">Error de Conexión</h2>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                    Error: {error} Verifica tu conexión a internet o el estado del servidor central.
                </p>
                <button 
                    onClick={() => window.location.reload()}
                    className="px-8 py-3 bg-status-error text-white rounded-full font-bold hover:brightness-110 transition-all transform hover:scale-105 shadow-lg shadow-status-error/30"
                >
                    Reintentar Conexión
                </button>
            </div>
        );
    }

    return (
        <div className="p-4 space-y-6 animate-in fade-in duration-1000">
            {/* Grid de StatCards usando las variables de status */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Humedad del Suelo" 
                    value={stats?.soil_humidity || "0"} 
                    unit="%" 
                    icon={HiBeaker} 
                    colorClass="text-blue-500" // El azul suele mantenerse igual en ambos modos
                />
                <StatCard 
                    title="Temperatura de Ambiente" 
                    value={stats?.ambient_temp || "0"} 
                    unit="°C" 
                    icon={HiSun} 
                    colorClass="text-status-warn" // Ámbar -> Amarillo brillante
                />
                <StatCard 
                    title="Evapotranspiración" 
                    value={stats?.evapotranspiration || "0"} 
                    unit="mm/día" 
                    icon={HiSun} 
                    colorClass="text-status-ok" // Verde -> Azul fuerte
                />
                <StatCard 
                    title="Consumo de Agua" 
                    value={stats?.water_consumption || "0"} 
                    unit="m³" 
                    icon={HiChartBar} 
                    colorClass="text-status-warn" // Consumo alto/alerta
                />
            </div>

            {/* Mapa interactivo */}
            <InteractiveMap />

            {/* Contenedor para los Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartHumedad />
                <ChartConsumo />
            </div>

            {/* Panel de Alertas */}
            <AlertBanner />
        </div>
    );
}