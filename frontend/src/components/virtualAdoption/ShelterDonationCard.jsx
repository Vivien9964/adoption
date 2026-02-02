import { Hammer, Cross, Bone, ShoppingBasket } from 'lucide-react';
import { useState } from 'react';


const ShelterDonationCard = ({ project }) => {

    const [ donations, setDonations ] = useState(project.currentAmount);

    const addDonation = (amount) => {
        setDonations(prev => Math.min(prev + amount), project.goalAmount);
    }

    const progressPercentage = (donations / project.goalAmount) * 100;


    const categoryConfig = {
        Infrastructure: {
            border: 'border-green-500',
            bg: 'bg-green-50',
            badge: 'bg-green-500',
            progress: 'bg-green-500',
            text: 'text-green-700',
            button: 'bg-green-500 hover:bg-green-600',
            icon: Hammer
          },
          Healthcare: {
            border: 'border-blue-500',
            bg: 'bg-blue-50',
            badge: 'bg-blue-500',
            progress: 'bg-blue-500',
            text: 'text-blue-700',
            button: 'bg-blue-500 hover:bg-blue-600',
            icon: Cross
          },
          'Food & Supplies': {
            border: 'border-orange-500',
            bg: 'bg-orange-50',
            badge: 'bg-orange-500',
            progress: 'bg-orange-500',
            text: 'text-orange-700',
            button: 'bg-orange-500 hover:bg-orange-600',
            icon: Bone
          },
          Equipment: {
            border: 'border-purple-500',
            bg: 'bg-purple-50',
            badge: 'bg-purple-500',
            progress: 'bg-purple-500',
            text: 'text-purple-700',
            button: 'bg-purple-500 hover:bg-purple-600',
            icon: ShoppingBasket
          }
    };

    const config = categoryConfig[project.category]|| categoryConfig.Infrastructure;
    const Icon = config.icon;





    return (
        <div className={`rounded-xl overflow-hidden shadow-xl border-4 ${config.border}`}>

            {/* Header with category badge */}
            <div className="relative h-48 overflow-hidden">
                <img 
                    src={project.image} 
                    alt={`${project.title}-${project.category}`} 
                    className="w-full h-full object-cover"
                />
                <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-white ${config.badge}` }>
                    {project.category}
                </div>
            </div>

            {/* Main card content */}
            <div className="p-4">

                {/* Card title wit icon and description */}
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                    <Icon className={`h-6 w-6 ${config.text}`} />
                    <h2 className={`${config.text} font-black tracking-wide`}>{project.title}</h2>
                    </div>
                    <p className="text-sm text-gray-600">{project.description}</p>
                </div>

                {/* Benefits section */}
                <div className="mt-3 flex flex-col gap-3 items-center">

                    {project.benefits.map((benefit) => (
                        <div 
                            className={`w-full px-3 py-2 ${config.text} ${config.bg} rounded-full border-2 ${config.border} text-sm text-center shadow-sm`}
                        >
                            {benefit}
                        </div>
                    ))}

                </div>


                {/* Progress section with progress bar and donation amount  */}
                <div className={`my-6 p-6 rounded-2xl border-l-2 ${config.border} shadow-md`}>
                    <div className="mb-1 flex justify-between text-sm text-gray-600">
                        <p>Progress</p>
                        <div>
                            <span className="font-black text-lg text-gray-700">{donations}Lei / </span>
                            <span className="text-gray-600 text-xs">{project.goalAmount}Lei</span>
                        </div>
                    </div>
                    <div className="w-full h-3 rounded-full bg-gray-200">
                        <div className={`${config.progress} h-full rounded-full transition-all duration-500`} style={{ width: `${progressPercentage}%`}}></div>
                    </div>

                    <div className="mt-2 flex justify-between">
                        <p className="text-xs font-bold text-yellow-900">{progressPercentage.toFixed(0)}% funded!</p>
                        <p className="text-xs font-bold text-gray-600">{project.goalAmount - donations}Lei to go!</p>
                    </div>
                </div>

                {/* CTA buttons */}
                <div>
                <button 
                    onClick={()=> addDonation(50)}
                    className={`w-full px-3 py-2 rounded-xl ${config.button}`}
                >
                        Donate
                </button>
                </div>


            </div>
        </div>
    )
}


export default ShelterDonationCard;