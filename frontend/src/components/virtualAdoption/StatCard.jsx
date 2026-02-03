import CountUp from "react-countup";



const StatCard = ({ icon, label, value, growthPercent, color }) => {

    const Icon = icon;

    const colorConfig = {
        blue: {
          iconBg: 'bg-sky-100',
          iconText: 'text-sky-700',
          border: 'border-sky-200',
          valueText: 'text-sky-800',
          growthBg: 'bg-sky-50'
        },
        green: {
          iconBg: 'bg-green-100',
          iconText: 'text-green-700',
          border: 'border-green-200',
          valueText: 'text-green-800',
          growthBg: 'bg-green-50'
        },
        purple: {
          iconBg: 'bg-purple-100',
          iconText: 'text-purple-700',
          border: 'border-purple-200',
          valueText: 'text-purple-800',
          growthBg: 'bg-purple-50'
        },
        amber: {
          iconBg: 'bg-amber-100',
          iconText: 'text-yellow-800',
          border: 'border-amber-200',
          valueText: 'text-yellow-800',
          growthBg: 'bg-amber-50'
        }
      };

      const config = colorConfig[color];


    return (
        <div className={`
            w-full p-6 flex flex-col items-center justify-center rounded-xl 
            shadow-md bg-white hover:shadow-lg transition-shadow duration-300
            border-2 ${config.border}
            `
        }>

            {/* Stat card icon */}
            <div className={`
                w-16 h-16 mb-4 flex items-center justify-center rounded-full ${config.iconBg}`}>
                <Icon className={`w-8 h-8 ${config.iconText}`} /> 
            </div>

            <p className="mb-2 text-center text-sm text-gray-600 font-medium">{label}</p>

            <h2 className={`mb-1 text-4xl font-black ${config.valueText}`}>
                <CountUp
                    end={value}
                    duration={3}
                    separator=","
                />
                <span className="ml-1 text-lg "> Lei</span>
            </h2>

        </div>
    )
}

export default StatCard;