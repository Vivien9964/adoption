import { Dog, House, ShoppingBasket } from "lucide-react";
import Button from "../common/Button";

// Card component used in donation breakdown component
const DonationBreakDownCard = ({ donationData }) => {

    const colorConfig = {
        yellow: {
          border: 'border-yellow-200',
          iconBg: 'bg-amber-50',
          iconColor: 'text-yellow-800',
          percentageColor: 'text-yellow-800',
          amountColor: 'text-yellow-900'
        },
        purple: {
          border: 'border-purple-200',
          iconBg: 'bg-purple-50',
          iconColor: 'text-purple-700',
          percentageColor: 'text-purple-700',
          amountColor: 'text-purple-600'
        },
        blue: {
          border: 'border-blue-200',
          iconBg: 'bg-blue-50',
          iconColor: 'text-blue-700',
          percentageColor: 'text-blue-700',
          amountColor: 'text-blue-600'
        }
      };
      
      const config = colorConfig[donationData.color];
      const Icon = donationData.icon;

      return (
        <div className={`
          p-6 flex flex-col items-center justify-center gap-3 
          bg-white rounded-2xl border-2 ${config.border}
          shadow-md hover:shadow-lg transition-all duration-300
          hover:scale-105 hover:-rotate-1
        `}>
          
          {/* Icon */}
          <div className={`w-20 h-20 rounded-full ${config.iconBg} flex items-center justify-center`}>
            <Icon className={`w-10 h-10 ${config.iconColor}`} />
          </div>
          
          {/* Percentage */}
          <span className={`text-5xl ${config.percentageColor} font-black`}>
            {donationData.percentage}%
          </span>
          
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-800">
            {donationData.title}
          </h3>
          
          {/* Amount */}
          <p className="text-sm text-gray-600">
            <span className={`text-2xl font-bold ${config.amountColor}`}>
              {donationData.amount.toLocaleString()} Lei
            </span> donated
          </p>
          <p className="mt-2 text-sm font-semibold text-gray-600"> = {donationData.stat}</p>

        </div>
    );
}


// Main component that is used in donation stats section
const DonationBreakDown = ({ onDonateClick }) => {

    const breakdownData = [
        {
          id: 1,
          icon: Dog,
          percentage: 45,
          title: "Dog Medical Care",
          amount: 6750,
          stat: "12 dogs",
          color: "yellow"
        },
        {
          id: 2,
          icon: House,
          percentage: 30,
          title: "Shelter Projects",
          amount: 4500,
          stat: "3 projects",
          color: "purple"
        },
        {
          id: 3,
          icon: ShoppingBasket,
          percentage: 25,
          title: "Food & Supplies",
          amount: 3750,
          stat: "50kg food, 20 toys",
          color: "blue"
        }
    ];

    return (
        <div className="py-18 px-6">
            
            {/* Header */}
            <div className="mb-12 text-center">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                    <span className="text-yellow-400">Where</span>{" "}
                    <span className="text-yellow-900">It Goes</span>
                </h2>
                <p className="mt-4 text-lg text-gray-600 font-light">
                    January 2026 allocation breakdown
                </p>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 mt-4">
                { breakdownData.map((item) => (
                    <DonationBreakDownCard key={item.id} donationData={item} />
                ))}
            </div>
            

            <div className="pt-6 flex flex-col gap-6 items-center">
              <h2 className="text-2xl text-yellow-900 font-black">
                Ready to take action?
              </h2>
              
              <div className="flex items-center justify-evenly gap-8">
                <Button 
                  size="large"
                  onClick={() => onDonateClick(null, "one-time")}
                > 
                  Make a one-time donation
                </Button>
                <Button 
                  variant="outline" 
                  size="large"
                  onClick={() => onDonateClick(null, "monthly")}
                > 
                  Become a monthly donor
                </Button>
              </div>
            </div>

        </div>
    )
}


export default DonationBreakDown;