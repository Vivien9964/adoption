import { shelterProjects } from "../../data/shelterProjectsData";
import ShelterDonationCard from "./ShelterDonationCard";
import Section from "../layout/Section";




const ShelterProjectsSection = () => {
    return (
        <Section padding="small">
            {/* Shelter projects grid to display shelter project cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            { shelterProjects.map((project) => (
                    <ShelterDonationCard key={project.id} project={project} />
                ))}
            </div>
        </Section>
    )
}

export default ShelterProjectsSection;