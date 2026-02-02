import UrgentFeaturedCarousel from "./UrgentFeaturedCarousel";
import Section from "../layout/Section";
import UrgentCardGrid from "./UrgentCardGrid";
import ShelterDonationCard from "./ShelterDonationCard";
import { Activity } from 'lucide-react';
import { shelterProjects } from "../../data/shelterProjectsData";


const UrgentNeedsSection = () => {
    return (
        // Main section container
        <Section padding="normal">
            
            {/* Urgent featured donations container with badge and carousel */}
            <div className="mb-12">
                    {/* Urgent badge */}
                    <div className="
                        flex items-center justify-center gap-3 my-4 px-3 py-2 max-w-sm rounded-full
                        bg-amber-400 text-yellow-900 border-2 border-amber-500"
                    >
                        <Activity className="h-6 w-6 font-black text-yellow-900 animate-pulse" />
                       <h3 className="font-black text-gray-700 text-lg" style={{ fontFamily: "Arial Black, sans-serif"}}>
                            Dogs that need help right now!
                        </h3>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-2 my-4 p-2">
                        <h2 className="font-black text-xl text-gray-700 tracking-wide">These pups need immediate care.</h2>
                        <p className="text-gray-500 text-md">Every lei brings them closer to recovery!</p>
                    </div>

                    {/* Carousel */}
                    <UrgentFeaturedCarousel />
            </div>

            {/* Standard care donations container */}
            <div className="flex flex-col gap-4">
                <h3>A little push to find a home</h3>
                {/* Standard donations card grid witg cards*/}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <UrgentCardGrid />
                    <UrgentCardGrid />
                    <UrgentCardGrid />
                </div>

                <button className="mt-6 max-w-md m-auto rounded-full bg-sky-200">Show all cases</button>
            </div>

            {/* Shelter donations container 
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

                { shelterProjects.map((project) => (
                    <ShelterDonationCard key={project.id} project={project} />
                ))}

            </div>
            */}

     


        </Section>


    
    )
}

export default UrgentNeedsSection;