import { HiExclamationCircle } from "react-icons/hi";

const AlertBanner = () => {
    return(
        <div className="mt-6 rounded-xl overflow-hidden border border-gray-200 shadow-md">
            {/* Header del Panel */}
            <div className="bg-[#1D2F58] p-3 flex justify-between items-center px-6" >
                <div className="text-white font-bold flex gap-2 items-center">
                    Panel de Alertas Activas <span className="text-xs font-normal opacity-70"> Monitoreo en Tiempo Real </span>
                </div>
                <span className="bg-[#FF2F2F] text-white text-xs px-3 py-1 rounded-full font-bold">
                    1 CRÍTICO
                </span>
            </div>

            {/* Cuerpo de la Alerta */}
            <div className="bg-[#FCF3F2] p-6 flex items-start gap-4">
                <HiExclamationCircle className="text-[#FF2F2F] text-2xl mt-1" />
                <div>
                    <div className="flex items-center gap-3">
                        <h3 className="text-[#FF2F2F] font-bold text-lg">
                            Desconexión de los sensores del Área 1
                        </h3>
                        <span className="bg-[#FF2F2F] text-white text-[10px] px-2 py-0.5 rounded font-bold">
                            CRÍTICO
                        </span>
                    </div>
                    <p className="text-gray-400 text-sm mt-1">
                        Datos no actualizados desde hace 2 horas
                    </p>
                </div>
            </div>

            {/* Pie del Panel */}
            <div className="bg-white p-10 text-center">
                <h2 className="text-gray-300 text-4xl font-light tracking-wide">
                    No existen más alertas pendientes
                </h2>
            </div>
        </div>
    )
}
export default AlertBanner