import { Coins,  Users, Calendar } from "lucide-react"


// Card used in succes stories component
const SuccessStoryCard = ({ successData }) => {
    return (
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
                    src={successData.beforeImage} 
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
                    src={successData.afterImage} 
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
            {successData.title}
        </h2>
        
        {/* Short update, outcome */}
        <div className="
            mb-4 p-4 rounded-lg border-l-4 border-yellow-500 bg-yellow-50"
        >
            <p className="text-sm text-gray-700 italic">
                {successData.update}
            </p>
        </div>


        {/* Stats */}
        <div className="flex justify-evenly text-sm text-gray-600 items-center gap-2">

            {/* Money collected */}
            <div className="flex flex-col lg:flex-row gap-2 items-center">
                <Coins className="h-4 w-4 text-yellow-800" />
                <p className="font-semibold m-auto">{successData.donationsReceived.toLocaleString()} Lei</p>
            </div>
            
            {/* Divider */}
            <div className="h-6 w-[1px] bg-yellow-800"></div>
            
            {/* Number of people donated */}
            <div className="flex flex-col lg:flex-row gap-2 items-center">
                <Users className="h-4 w-4 text-yellow-800" />
                <p className="font-semibold">{successData.donors} Donors</p>
            </div>

             {/* Divider */}
             <div className="h-6 w-[1px] bg-yellow-800"></div>
            
            {/* Project, procedure was completed */}
            <div className="flex flex-col lg:flex-row gap-2 items-center">
                <Calendar className="h-4 w-4 text-yellow-800" />
                <p className="font-semibold">{successData.procedureCompleted}</p>
            </div>
        </div>


        </div>
    )
}




// Main component used in donation stats section
const SuccessStories = () => {

    const successData = [
        {
            id: 1,
            beforeImage: "https://picsum.photos/400/300?grayscale",
            afterImage: "https://picsum.photos/400/300",
            title: "Luna's emergency surgery",
            update: "Surgery successful. Luna is recovering!",
            donationsReceived: 3200,
            donors: 12,
            procedureCompleted: "Jan, 2026"
        },
        {
            id: 2,
            beforeImage: "https://picsum.photos/400/300?grayscale",
            afterImage: "https://picsum.photos/400/300",
            title: "Shelter insulation",
            update: "Our shelter is well insulated. 50 dogs are safe from the cold.",
            donationsReceived: 8000,
            donors: 30,
            procedureCompleted: "Oct, 2025"
        },
        {
            id: 3,
            beforeImage: "https://picsum.photos/400/300?grayscale",
            afterImage: "https://picsum.photos/400/300",
            title: "PinPin's special treatment",
            update: "PinPin is now in safe hands with Dr.Bingusz! He shows imporvement.",
            donationsReceived: 1500,
            donors: 8,
            procedureCompleted: "Dec, 2025"
        },
        {
            id: 4,
            beforeImage: "https://picsum.photos/400/300?grayscale",
            afterImage: "https://picsum.photos/400/300",
            title: "Winter Supply",
            update: "Our dogs have enough food to get through the winter months!",
            donationsReceived: 6000,
            donors: 40,
            procedureCompleted: "Oct, 2025"
        }
    ];



    return (
      <div className="py-18 px-6">

        {/* Header */}
        <div className="mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                <span className="text-yellow-400">Stories of</span>{" "}
                <span className="text-yellow-900">Hope</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 font-light">
                Real lives, real change
            </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {successData.map((item) => (
                <SuccessStoryCard key={item.id} successData={item} />
            ))}
        </div>
           
      </div>
    )
}


export default SuccessStories;