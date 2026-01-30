import UrgentFeaturedCarousel from "./UrgentFeaturedCarousel";
import Section from "../layout/Section";
import UrgentCardGrid from "./UrgentCardGrid";

const UrgentNeedsSection = () => {
    return (
    
        <Section padding="normal">

            <div className="mb-12">
                    <h3>Emergency Cases</h3>
                    <UrgentFeaturedCarousel />
            </div>

            <div>
                <h3>Standard Care Needed</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <UrgentCardGrid />
                    <UrgentCardGrid />
                    <UrgentCardGrid />
                    <UrgentCardGrid />
                </div>
            </div>
     


        </Section>


    
    )
}

export default UrgentNeedsSection;