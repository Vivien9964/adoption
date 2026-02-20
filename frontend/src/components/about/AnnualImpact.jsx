import Section from "../layout/Section";
import { Dog, Heart, Syringe } from "lucide-react";
import { DonationBreakDownCard } from "../virtualAdoption/DonationBreakDown";


const AnnualImpact = () => {

    const impactData = [
        {
            id: 1,
            icon: Dog,
            value: 42,
            title: "Dogs Rescued",
            amount: 0,
            stat: "This year alone",
            color: "yellow"
        },
        {
            id: 2,
            icon: Heart,
            value: 31,
            title: "Forever Homes",
            amount: 0,
            stat: "Found",
            color: "purple"
        },
        {
            id: 3,
            icon: Syringe,
            value: "120+",
            title: "Vaccines Given",
            amount: 0,
            stat: "Medical care provided",
            color: "blue"
        }
    ];



    return (

        <Section padding="normal">

            {/* Header */}
            <div className="mb-12 text-center">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                    <span className="text-yellow-400">2025</span>{" "}
                    <span className="text-yellow-900">Highlights</span>
                </h2>
            </div>

            {/* Annual achievements grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {impactData.map((impact) => (
                    <DonationBreakDownCard 
                        key={impact.id}
                        donationData={impact}
                        showAmount={false}
                    />
                ))}

            </div>



        </Section>

    )
}

export default AnnualImpact;