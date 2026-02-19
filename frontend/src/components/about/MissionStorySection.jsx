import Section from "../layout/Section";

const MissionStroySection = () => {

    return (
        <Section padding="small">

             {/* Header */}
             <div className="mb-12 text-center">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                    <span className="text-yellow-400">Our</span>{" "}
                    <span className="text-yellow-900">Story</span>
                </h2>
            </div>


            {/* Main content */}
            <div className="p-4 flex flex-col md:flex-row items-center gap-8">

                {/* Section image */}
                <div className="flex-1">

                    {/* Image container with background */}
                    <div className="relative max-w-md group cursor-pointer">
                        <div
                            className="
                                absolute inset-0 opacity-50
                                bg-yellow-400 rounded-3xl rotate-6
                                group-hover:-rotate-6 transition-transform duration-300"
                        />

                        <div className="
                                relative rounded-3xl shadow-2xl overflow-hidden
                                bg-yellow-200 transition-shadow duration-300"
                        >
                            <img 
                                src="/images/About-hero.jpg" 
                                alt="about image" 
                                className=" 
                                    w-full h-auto object-cover
                                    group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                    </div>

                </div>

                {/* Short background description */}
                <div className="flex-1 flex flex-col gap-4">

                    <p className="text-lg md:text-lg text-gray-700 leading-relaxed">
                        Founded in 2015, <strong className="text-yellow-900">PawSome Shelter</strong> 
                        began with a simple mission: give every abandoned dog a second chance at happiness.
                    </p>

                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                        What started as a small rescue operation in Arad has grown into a 
                        community-driven organisation supported by over 
                        <strong className="text-yellow-900"> 120 active volunteers</strong>, 
                        and together we managed to help over {" "} 
                        <strong className="text-yellow-900">500 dogs</strong> to find hope, healing, 
                        and loving families.
                    </p>

                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                        Every dog that comes through our doors receives medical care, training, 
                        and unconditional love.
                    </p>

                </div>

            </div>
        </Section>
    )
}

export default MissionStroySection;