//We can use either export or export default 

import AlertBanner from "../Components/Dashboard/AlertBanner";
import StatCard from "../Components/Dashboard/StatCard";
import { HiBeaker, HiSun, HiChartBar} from "react-icons/hi";

/*Export allows us to experot many types of components from the page
Meanwhile export default is the base setting if we export just the file*/ 
export default function Home(){
    //Here you can insert all the Javascript you need for functionality
    
    return(
        //This is required as it states specifically where the component starts and ends
        <>
        <div className="p-4 space-y-6">

            {/* Grid de 4 columnas para las tarjetas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Humedad del Suelo" value="35.3" unit="%" icon={HiBeaker} colorClass="text-blue-500" />
                <StatCard title="Temperatura de Ambiente" value="19.3" unit="°C" icon={HiSun} colorClass="text-orange-500" />
                <StatCard title="Evapotranspiración" value="4.2" unit="mm/día" icon={HiSun} colorClass="text-green-500" />
                <StatCard title="Consumo de Agua" value="1,241" unit="m³" icon={HiChartBar} colorClass="text-orange-400" />
            </div>

            {/* Aquí iría el Mapa interactivo */}

            {/* Panel de Alertas */}
            <AlertBanner />
        </div>
        </>
    )
}