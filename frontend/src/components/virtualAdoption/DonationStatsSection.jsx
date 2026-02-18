import SuccessStories from "./SuccessStories";
import DonationBreakDown from "./DonationBreakDown";
import Section from "../layout/Section";
import StatCards from "./StatCards";



const DonationStatsSection = ({ onDonateClick }) => {
    return (
        <Section padding="small">

            {/* Donation status cards */}
            <StatCards onDonateClick={onDonateClick} />
            
            {/* Success stories */}
            <SuccessStories />

            {/* Donations breakdown */}
            <DonationBreakDown onDonateClick={onDonateClick} />

        </Section>
    )
}

export default DonationStatsSection;