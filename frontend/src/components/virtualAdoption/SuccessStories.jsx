import { Coins,  Users, Calendar } from "lucide-react"


const SuccessStories = () => {

    return (
        // Main success card body
        <div className="
           relative p-8 rounded-2xl 
            bg-white border-2 border-yellow-200
            shadow-md hover:shadow-lg transition-shadow duration-300"
        >
        
        {/* Before, after images */}
       <div className="flex gap-4 mb-4">
            
            {/* Before image with badge */}
            <div className="relative flex-1">
                <img 
                    src="https://picsum.photos/400/300?grayscale" 
                    alt="before-image"
                    className="w-full h-[200px] object-cover rounded-lg grayscale opacity-80" 
                />
                <span className="
                    absolute bottom-2 left-2 px-2 py-1 rounded
                    bg-gray-500 text-white text-xs font-bold"
                >
                    BEFORE
                </span>
            </div>

            {/* After image with badge */}
            <div className="flex-1 relative">
                <img 
                    src="https://picsum.photos/400/300" 
                    alt="after-image" 
                    className="w-full h-[200px] object-cover rounded-lg"
                />
                <span className="
                    absolute bottom-2 left-2 px-2 py-1 rounded
                    bg-yellow-500 text-yellow-900 text-xs font-bold"
                >
                    AFTER
                </span>
                
            </div>

       </div>
        
        {/* Title */}
        <h2 className="mb-3 font-bold text-gray-700 text-xl">
            Luna's emergency surgery
        </h2>
        
        {/* Short update, outcome */}
        <div className="
            mb-4 p-4 rounded-lg border-l-4 border-yellow-500 bg-yellow-50"
        >
            <p className="text-sm text-gray-700 italic">
                "Surgery successful! Luna is recovering!"
            </p>
        </div>


        {/* Stats */}
        <div className="flex justify-evenly text-sm text-gray-600 items-center gap-2">

            {/* Money collected */}
            <div className="flex flex-col lg:flex-row gap-2 items-center">
                <Coins className="h-4 w-4 text-yellow-800" />
                <p className="font-semibold">3,200 Lei</p>
            </div>
            
            {/* Divider */}
            <div className="h-6 w-[1px] bg-yellow-800"></div>
            
            {/* Number of people donated */}
            <div className="flex flex-col lg:flex-row gap-2 items-center">
                <Users className="h-4 w-4 text-yellow-800" />
                <p className="font-semibold">24 Donors</p>
            </div>

             {/* Divider */}
             <div className="h-6 w-[1px] bg-yellow-800"></div>
            
            {/* Project, procedure was completed */}
            <div className="flex flex-col lg:flex-row gap-2 items-center">
                <Calendar className="h-4 w-4 text-yellow-800" />
                <p className="font-semibold">Jan 2026</p>
            </div>

            
        </div>


        </div>
    )
}


export default SuccessStories;