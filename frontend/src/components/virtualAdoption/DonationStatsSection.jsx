import SuccessStories from "./SuccessStories";
import DonationBreakDown from "./DonationBreakDown";
import Section from "../layout/Section";
import StatCards from "./StatCards";



const DonationStatsSection = () => {
    return (
        <Section padding="normal">

            {/* Donation status cards */}
            <StatCards />
            
            {/* Success stories */}
            <SuccessStories />

            {/* Donations breakdown */}
            <DonationBreakDown />

        </Section>
    )
}

export default DonationStatsSection;