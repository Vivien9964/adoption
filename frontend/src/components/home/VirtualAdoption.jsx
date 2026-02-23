import Section from '../layout/Section';
import Button from '../common/Button';
import { Heart, Coins } from "lucide-react";


// Separate card component for showing help options
const HelpOptionCard = ({ option }) => {

    const IconComponent = option.icon;

    return (
        <div
        key={option.id}
        className="
            p-6 md:p-8 group rounded-2xl
            border-2 border-transparent hover:border-yellow-300
            bg-sky-50 hover:bg-white
            transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
        {/* Icon container with icon */}
        <div className="
            w-14 h-14 md:w-16 md:h-16 mb-4 md:mb-5
            flex items-center justify-center rounded-full
            bg-yellow-300/80 group-hover:bg-yellow-300
            group-hover:scale-110 group-hover:rotate-6
            transition-all duration-300"
        >
            <IconComponent 
                className="w-7 h-7 md:w-8 md:h-8 text-yellow-800"
                strokeWidth={2}
            />
        </div>

        {/* Title */}
        <h3 className="mb-3 text-xl md:text-2xl font-bold text-yellow-900">
            {option.title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-700 leading-relaxed">
            {option.description}
        </p>
    </div>
    )

}



const VirtualAdoption = () => {

    const virtualOptions = [
        {
            id: 1,
            icon: Heart,
            title: "Urgent Medical Cases",
            description: "Support dogs with urgent medical needs. Your donation can save a life and give them a second chance.",
        },
        {
            id: 2,
            icon: Coins,
            title: "General donations",
            description: "Help with food, toys, shelter maintenance, and daily care. Every lei makes a difference in a dog's life!",
        }
    ];



    return(
        <Section padding="large" background="white">

            {/* Header with title and description */}
            <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-800">
                    Can't Adopt <span className="text-yellow-400">Right Now?</span>
                </h2>
                <p className="max-w-3xl mx-auto text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
                    You can still make a huge difference! Support our dogs through the{" "}
                    <span className="font-bold text-gray-700">Virtual Adoption Program</span>.
                </p>
            </div>

            {/* Options grid with option cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10 md:mb-12">
               {virtualOptions.map((option) => (
                    <HelpOptionCard
                        key={option.id}
                        option={option}
                    />
               ))}
            </div>
            
            {/* CTA button to go to get involved page*/}
            <div className="flex justify-center">
                <Button 
                    variant="accent" 
                    size="large" 
                    href="/virtual-adoption" 
                    className="group"
                >
                    Learn More
                </Button>
            </div>

        </Section>
    )
}


export default VirtualAdoption;