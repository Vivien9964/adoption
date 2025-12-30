 import Section from '../layout/Section';
 import { Shield, Home, DollarSign } from 'lucide-react';


 const ChooseUsSection = () => {

    // Reasons data - data stays local to component
    const reasons = [
        {
            id: 1,
            icon: Shield,
            title: "Health & Safety",
            description: "All dogs are vaccinated, neutered and health-checked. We ensure they are fully ready for their new life with you."
        },
        {
            id: 2,
            icon: DollarSign,
            title: "Zero cost Adoption",
            description: "Adoptions have no fees. We want to make adoption accessible for everyone."
        },
        {
            id: 3,
            icon: Home,
            title: "Visit Anytime",
            description: "Come and meet our dogs, play, ask questions. No pressure, just connection."
        }
    ];


    return (
        <Section background="white" padding="normal" maxWidth="7xl" id="choose-us">
            
            {/* Section header with main title and subtitle */}
            <div className="mb-12 md:mb-16 text-center">
                <h2 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-900">
                    Why Adopt from <span className="text-amber-500">Us</span> ?
                </h2>

                <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600">
                    We are a small non-profit shelter with a big heart.
                    Every dog matters, and so do you!
                </p>
            </div>

            {/* Section content (section grid) with reason cards*/}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {reasons.map((reason) => {
                    const IconComponent = reason.icon;

                    return (
                        // Main container for reason card
                        <div
                            key={reason.id}
                            className="
                            p-6 md:p-8 group rounded-2xl
                            border-2 border-transparent hover:border-yellow-300
                            bg-sky-50 hover:bg-white
                            transition-all duration-300 hover:shadow-lg hover:-translate-y-1 
                             "
                        >

                            {/* Icon container with icon */}
                            <div className="
                                 w-14 h-14 md:w-16 md:h-16 mb-4 md:mb-5
                                 flex items-center justify-center rounded-full
                                 bg-yellow-300/80 group-hover:bg-yellow-300
                                 group-hover:scale-110 group-hover:rotate-6
                                 transition-all duration-300
                            ">

                                <IconComponent 
                                    className="w-7 h-7 md:w-8 md:h-8 text-yellow-800"
                                    strokeWidth={2} 
                                />
                            </div>

                            {/* Card content */}
                            <h3 className="mb-3 text-xl md:text-2xl font-bold text-yellow-900">
                                {reason.title}
                            </h3>

                            <p className="text-gray-700 leading-relaxed">
                                {reason.description}
                            </p>
                        </div>
                    );
                })}

            </div>



        </Section>        
    )
 }

 export default ChooseUsSection;