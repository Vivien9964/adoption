import StatCard from "./StatCard";
import SuccessStories from "./SuccessStories";
import Section from "../layout/Section";
import { Coins, Dog, CheckCircle2, Users } from "lucide-react"



const DonationStatsSection = () => {
    return (
        <Section padding="normal">

            {/* Donation status cards */}
            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                <StatCard
                    icon={Coins}
                    label="Total Donations"
                    value={45230}
                    color="amber"
                    suffix="Lei"
                />

                <StatCard
                    icon={Dog}
                    label="Dogs Helped"
                    value={127}
                    color="green"
                />

                <StatCard
                    icon={CheckCircle2}
                    label="Projects Completed"
                    value={20}
                    color="purple"
                />

                <StatCard
                    icon={Users}
                    label="Active Donors"
                    value={150}
                    color="blue"
                />
            </div>

            <div className="p-6 my-8 bg-amber-200 text-center">
                <h2 className="font-black text-yellow-800 text-2xl">SUCCESS STORIES</h2>
                <p>See the incredible impact of YOUR donations</p>
            </div>

            {/* Success stories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <SuccessStories />
                <SuccessStories />
                <SuccessStories />
                <SuccessStories />
            </div>



        </Section>
    )
}

export default DonationStatsSection;