const StatCard = ({title, value, unit, icon: Icon, colorClass}) => {
    return(
    <div className="bg-white p-6 rounded-2xl border-2 border-[#0EFF0A] shadow-sm flex flex-col relative overflow-hidden">
        <div className="flex justify-between items-start mb-4">
            <div className="text-gray-500 font-semibold text-sm">{title}</div>
            <Icon className={`text-2xl ${colorClass}`} />
        </div>
        <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-800">{value}</span>
            <span className="text-lg text-gray-500 font-medium">{unit}</span>
        </div>
        <Icon className="absolute -bottom-4 -right-4 text-7xl opacity-5 text-gray-400" />
    </div>
    )
}

export default StatCard