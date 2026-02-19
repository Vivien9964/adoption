import Section from "../layout/Section";
import { Dog, Heart, Clock, CircleCheck } from "lucide-react";
import CountUp from "react-countup";

const MissonStatCard = ({ stat }) => {

        const IconComponent = stat.icon;

    return (
        // Main container
        <div className="
                p-6 w-full flex-1 flex flex-col items-center justify-center text-center cursor-pointer
                rounded-2xl bg-white border-2 border-gray-200
                hover:border-yellow-300 hover:shadow-lg hover:scale-105
                transition-all duration-300"
        >
            {/* Icon container */}
            <div className="flex items-center justify-center w-14 h-14 mb-3 rounded-full bg-yellow-200">
                <IconComponent className="w-7 h-7 text-yellow-800" />
            </div>

            {/* Status count */}
            <h3 className="text-2xl md:text-3xl font-black text-yellow-800 mb-1">
                <CountUp end={stat.value} duration={3} separator="," />
            </h3>

            {/* Status label */}
            <p className="text-sm md:text-base font-semibold text-gray-600">
                {stat.label}
            </p>

            {/* Divider */}
            <div className="mt-4 h-[2px] w-[80%] bg-yellow-400" />

            {/* Info box */}
            <div className="mt-4 flex flex-col gap-2">
                <h2 className="text-xl md:text-2xl font-black text-gray-800">{stat.info}</h2>
                <p className="text-gray-600">{stat.description}</p>

            </div>

        </div>
    )

}






const MissionStats = () => {

    const stats = [
        { icon: Dog, value: 500, label: "Dogs Rescued", info: "100%", description: "Vaccinated"},
        { icon: Heart, value: 350, label: "Dogs Adopted", info: "0 Lei", description: "Adoption fee"},
        { icon: Clock, value: 10, label: "Years Active", info: "50+", description: "Active volunteers"}
    ];


    return (
        <Section padding="small">

             {/* Header */}
             <div className="mb-12 text-center">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                    <span className="text-yellow-400">Our</span>{" "}
                    <span className="text-yellow-900">Work</span>
                </h2>
            </div>

            {/* Main content */}
            <div className="flex flex-col md:flex-row gap-6">

                {/* Mission card */}
                <div className="
                        p-6 w-full md:w-[40%] flex flex-col justify-evenly rounded-3xl
                        bg-yellow-300 border-2 border-yellow-200
                        hover:border-yellow-300 hover:shadow-md
                        transition-all duration-500"
                >

                    {/* Title */}
                    <h3 className="mb-4 text-2xl md:text-3xl font-bold text-yellow-900">
                        Our Mission
                    </h3>

                    {/* Description */}
                    <p className="text-gray-700 leading-relaxed text-md md:text-lg">
                        We rescue, rehabilitate, and rehome abandoned
                        dogs in Arad. Every dog deserves a second chance
                        at happiness, and we're here to make that happen.
                    </p>
                </div>

                {/* Misson stat cards  */}
                <div className="w-full md:w-[60%] flex flex-col md:flex-row gap-4">
                    {stats.map((stat, index) => (
                        <MissonStatCard 
                            stat={stat}
                            key={index}
                        />
                    ))}
                </div>


            </div>


        </Section>
    )
}

export default MissionStats;