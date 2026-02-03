import StatCard from "./StatCard";
import { Coins, Dog, CheckCircle2, Users } from "lucide-react"



const DonationStatsSection = () => {
    return (
        <div>

            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                <StatCard
                    icon={Coins}
                    label="Total Donations"
                    value={45230}
                    color="amber"
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

        </div>
    )
}

export default DonationStatsSection;