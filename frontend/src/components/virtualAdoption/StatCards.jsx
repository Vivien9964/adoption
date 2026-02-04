import CountUp from "react-countup";
import { Coins, Dog, CheckCircle2, Users } from "lucide-react"

// Card component used in stat cards component
const StatCard = ({ icon, label, value, suffix, color }) => {

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
               { suffix && ( <span className="ml-1 text-lg "> Lei</span> )} 
            </h2>

        </div>
    )
}


// Main component used in donation stats section
const StatCards = () => {

  return (
    <div className="py-8 px-6">
      
      {/* Header */}
      <div className="mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          <span className="text-yellow-400">Your</span>{" "}
          <span className="text-yellow-900">Impact</span>
        </h2>
        <p className="mt-4 text-lg text-gray-600 font-light">
          Your donations since 2024
        </p>
      </div>

      {/* Cards grid */}
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard
            icon={Coins}
            label="Total Collected"
            value={60230}
            color="amber"
            suffix="Lei"
          />

          <StatCard
            icon={Dog}
            label="Dogs Helped"
            value={127}
            color="green"
          />

          <StatCard
            icon={CheckCircle2}
            label="Projects Completed"
            value={20}
            color="purple"
          />

          <StatCard
            icon={Users}
            label="Active Donors"
            value={150}
            color="blue"
          />
          
        </div>
    </div>
  )
}

export default StatCards;