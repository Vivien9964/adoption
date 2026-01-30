import UrgentFeaturedCarousel from "./UrgentFeaturedCarousel";
import Section from "../layout/Section";

const UrgentNeedsSection = () => {
    return (
    
        <Section padding="normal">

            <div className="mb-12">
                    <h3>Emergency Cases</h3>
                    <UrgentFeaturedCarousel />
            </div>

            <div>
                <h3>Standard Care Needed</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                    <div>6</div>
                </div>
            </div>
     


        </Section>


    
    )
}

export default UrgentNeedsSection;