import Section from "../layout/Section";
import { House, Coins, User } from "lucide-react";
import { Link } from "react-router-dom";


// Action card component used in get involved section
const ActionCard = ({ action }) => {


    const designs = [
        {
            flag: "adoption",
            cardBg: "bg-yellow-200/90 hover:bg-yellow-300/95",
            iconColor: "text-yellow-900",
            titleColor: "text-yellow-900",
            buttonBg: "bg-yellow-800 hover:bg-yellow-900"
        },

        {
            flag: "donation",
            cardBg: "bg-sky-200/90 hover:bg-sky-300/95",
            iconColor: "text-sky-900",
            titleColor: "text-sky-900",
            buttonBg: "bg-sky-700 hover:bg-sky-800"
        },

        {
            flag: "volunteering",
            cardBg: "bg-amber-300/80 hover:bg-amber-300/95",
            iconColor: "text-amber-900",
            titleColor: "text-amber-900",
            buttonBg: "bg-amber-600 hover:bg-amber-700"
        }
    ];
 
    const design = designs.find((d) => d.flag === action.flag);
    const IconComponent = action.icon;

    return (
        <Link to={action.link}>
            {/* Main container */}
            <div className={`
                p-4 md:p-8 group relative overflow-hidden flex rounded-3xl shadow-lg
                ${design.cardBg} hover:shadow-xl hover:-translate-y-2
                transition-all duration-300 ease-out cursor-pointer`
                }
            >

                {/* Title, description and CTA button for adoption */}
                <div className="p-4 flex-1 flex flex-col justify-between gap-6">

                    {/* Header*/}
                    <div className="flex items-center gap-4">
                        <IconComponent 
                            className={`
                                w-8 h-8 md:w-10 md:h-10 ${design.iconColor}
                                group-hover:scale-110 group-hover:rotate-3
                                transition-transform duration-300`}
                            />
                        <h2 className={`text-2xl md:text-4xl font-bold ${design.titleColor}`}>{action.title}</h2>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-md">{action.description}</p>

                    {/* CTA button */}
                    <button
                        className={`
                            self-start px-8 py-3 rounded-xl 
                            text-white ${design.buttonBg} font-semibold text-sm md:text-base
                            group-hover:scale-105 group-hover:shadow-lg active:scale-95`
                        }
                    >
                        {action.buttonText}
                    </button>

                </div>

                {/* Adoption image if available */}
                {action.img && (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="relative">
                            <img 
                                src={action.img} 
                                alt={action.title}
                                className="
                                    w-64 h-64 md:w-72 md:h-72 object-cover rounded-full 
                                    border-4 border-white/50 shadow-xl
                                    group-hover:scale-105 group-hover:rotate-2
                                    transition-transform duration-300"
                            />

                        </div>
                    </div>
                )}

            </div>
        </Link>
       
    );
}






const GetInvolvedSection = () => {

    const actions = [
        {
            id: 1,
            flag: "adoption",
            icon: House,
            img: "/images/Hero-puppy.jpg",
            title: "Adopt a dog",
            description: "Give a forever home for a rescue dog. Lots of dogs are waiting for a loving home just like yours!",
            buttonText: "See all dogs",
            link: "/dogs"
        },

        {
            id: 2,
            flag: "donation",
            icon: Coins,
            title: "Donate",
            description: "Support our mission, every lei goes toward food, care and shelter for dogs in need.",
            buttonText: "Donate now",
            link: "/virtual-adoption"
        },

        {
            id: 3,
            flag: "volunteering",
            icon: User,
            title: "Become a volunteer",
            description: "Play with our dogs, help around the shelter or at events, foster. Your time change lives! ",
            buttonText: "Join our team",
            link: "/virtual-adoption?tab=volunteer"
        }
    ];



    return (
        <Section>

             {/* Header */}
             <div className="mb-12 text-center">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                    <span className="text-yellow-400">Make a</span>{" "}
                    <span className="text-yellow-900">Difference</span>
                </h2>
            </div>

            {/* Main content */}
            <div className="flex flex-col gap-6">

                {/* Adopt a dog card */}
                <ActionCard action={actions[0]} />
                
                {/* Donate and volunteer grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                   {actions.slice(1).map((action) => (
                        <ActionCard
                            key={action.id}
                            action={action}
                        />
                   ))}

                </div>  
            </div>
        </Section>
    )

}

export default GetInvolvedSection;