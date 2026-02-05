import { shelterProjects } from "../../data/shelterProjectsData";
import ShelterDonationCard from "./ShelterDonationCard";
import Section from "../layout/Section";




const ShelterProjectsSection = () => {
    return (
        <Section padding="small">
            
            <div className="mb-8 text-center">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                    <span className="text-yellow-400">Active</span>{" "}
                    <span className="text-yellow-900">Projects</span>
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                    Choose a project close to your heart
                </p>
            </div>

            {/* Shelter projects grid to display shelter project cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-8">
            { shelterProjects.map((project) => (
                    <ShelterDonationCard key={project.id} project={project} />
                ))}
            </div>
        </Section>
    )
}

export default ShelterProjectsSection;