import { useParams, useNavigate } from 'react-router-dom';
import dogsData from '../data/dogsData';
import Section from '../components/layout/Section';
import { 
    MapPin, 
    Calendar, 
    CircleCheck, 
    Baby,
    BadgeCheck,
    Building2,
    UserRound,
    PawPrint,
    HeartPulse,
    Trees,
    Zap, 
    Activity,
    Award,
    CalendarHeart,
    Sparkles,
    Stethoscope,
    House

} from 'lucide-react';

const DogProfilePage = () => {

    // Taking id as string from url -> later needs to be parsed 
    const { id } = useParams();
    const navigate = useNavigate();

    // Find the dog from the "database" to be able to display data
    const dog = dogsData.find(dog => dog.id === parseInt(id));

    // Taken from PetCardDogsPage component to display age correctly
    const dogAge = dog.ageInMonths < 12 ? `${dog.ageInMonths} ${dog.ageInMonths === 1 ? "month" : "months"}`
                                 : `${dog.age} ${dog.age === 1 ? "year" : "years"}`

    // Helper function to format date properly
    function formatDate(date) {
        const newDate = new Date(date);
        return `${newDate.toLocaleString('en-US', { month: "short"  })} ${newDate.getFullYear()}`;
    }

    // Icon configuration for "Good with" section - the database is not concerned with UI related 
    const goodWithConfig = [
        { key: "apartmentLiving", label: "Apartments", icon: Building2 },
        { key: "yard", label: "Outdoors", icon: Trees },
        { key: "smallChildren", label: "Toddlers", icon: Baby },
        { key: "olderChildren", label: "Older Children", icon: UserRound },
        { key: "adults", label: "Adults", icon: UserRound },
        { key: "seniors", label: "Seniors", icon: HeartPulse },
        { key: "otherAnimals", label: "Other Animals", icon: PawPrint },
        { key: "experiencedOwners", label: "Experienced Owners", icon: BadgeCheck },
        { key: "activeOwners", label: "Active Owners", icon: Zap },
    ]
    



    return (
        <>
        {/* Main content container */}
        <Section padding='normal' background='gray'>

            {/* Profile picture - banner */}
            <div className='px-6 py-8 mb-4 rounded-xl bg-sky-200'>
                <img 
                    src={dog.mainImage} 
                    alt={`${dog.name}-${dog.breed}`} 
                    className='w-60 h-60 mx-auto object-cover rounded-full border-3 border-white'
                />
            </div>


            {/* Welcome badge with name, breed, greeting, location and arrival date */}
                <div className='mx-auto p-6 mb-3 rounded-xl bg-sky-50 border-2 border-yellow-300'>

                    {/* Name, breed arrival, location */}
                    <div className='flex justify-between items-start gap-6'>

                        {/*Name*/}
                        <div className='flex flex-col mb-4'>
                            <h1 className='mb-2 text-2xl md:text-4xl font-bold text-gray-800' >Hello, I'm {dog.name}!</h1>
                            <p className='text-lg text-gray-500'>{dog.breed}</p>
                        </div>

                    
                        {/* Arrival, location */}
                        <div className='flex flex-col sm:flex-row gap-2 mb-4'>

                            {/* Location badge */}
                            <span className='
                                        px-2 py-1 flex items-center justify-center gap-1 whitespace-nowrap
                                        rounded-xl bg-yellow-200 text-yellow-900 text-xs font-bold 
                                        border-2 border-yellow-300 '
                            >
                                <MapPin className='w-3 h-3 flex-shrink-0' />
                                {dog.location}
                            </span>

                            {/* Arrival date */}
                            <span className='
                                        px-2 py-1 flex items-center gap-1 rounded-xl whitespace-nowrap
                                        bg-yellow-200 text-yellow-900 text-xs font-bold 
                                        border-2 border-yellow-300'
                            >
                                <Calendar className='w-3 h-3 flex-shrink-0' />
                                {formatDate(dog.dateAdded)}
                            </span>
                        </div>

                    </div>

                    {/* Greeting text */}
                    <p className='text-gray-600'>I'm very happy that you are here, let me introduce myself.</p>

                </div>

                {/* Basic information - age, gender, weight, size */}
                {/* Breed, age, gender container */}
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5 mx-auto mb-4 p-3'>
                                
                        {/* Age container */}
                            <div className='text-center p-3 bg-yellow-200 border-2 border-gray-700/50 rounded-2xl'>
                                <p className='mb-1 text-xs tracking-wide font-semibold uppercase text-yellow-900/70'>Age</p>
                                <p className='text-lg leading-tight font-bold text-gray-800'>{dogAge}</p>
                            </div>
            
                        {/* Gender container */}
                            <div className='text-center p-3 bg-yellow-200 border-2 border-gray-700/50 rounded-2xl'>
                                <p className='mb-1 text-xs tracking-wide font-semibold uppercase text-yellow-900/70'>Gender</p>
                                <p className='text-lg leading-tight font-bold text-gray-800'>
                                    {dog.gender}
                                </p>
                            </div>
            
                        {/* Size container */}
                            <div className='text-center p-3 bg-yellow-200 border-2 border-gray-700/50 rounded-2xl'>
                                <p className='mb-1 text-xs tracking-wide font-semibold uppercase text-yellow-900/70'>Size</p>
                                <p className='text-lg leading-tight font-bold text-gray-800'>{dog.size}</p>
                            </div>
            
                        {/* Weight container */}
                            <div className='text-center p-3 bg-yellow-200 border-2 border-gray-700/50 rounded-2xl'>
                                <p className='mb-1 text-xs tracking-wide font-semibold uppercase text-yellow-900/70'>Weight</p>
                                <p className='text-lg leading-tight font-bold text-gray-800'>{dog.weight}kg</p>
                            </div>
            
                    </div>

                {/* About me section with description, characteristics and story */}
                    <div className='rounded-xl p-4 border-2 border-yellow-300'>

                        {/* Section title */}
                        <h2 className='mb-4 text-xl md:text-2xl lg:text-4xl text-gray-700 font-extrabold'>About Me</h2>

                        {/* Dog description */}
                        <p className='text-gray-600 text-md leading-relaxed'>
                            {dog.description}
                        </p>  

                        {/* Personality traits - badges container */}
                        <div className='flex flex-wrap md:flex-nowrap gap-3 mt-4'>

                            {dog.personality.map((trait, index) => (
                                <span 
                                    key={index}
                                    className='px-3 py-1 text-yellow-800 border-2 border-yellow-300 bg-yellow-300/50 rounded-xl'
                                >
                                    {trait}
                                </span>
                            ))}

                        </div>
                        
                        {/* Ideal home section  */}
                        <div className='mt-6 border-2 border-amber-300/50 bg-amber-50 rounded-xl p-6'>

                            <h2 className='text-xl lg:text-2xl font-bold text-gray-700 mb-1'>
                                My Ideal Home
                            </h2>

                            <div className='mt-4 p-3'>
                                <p className='text-gray-600'>Here goes the ideal home description later on when the database is updated.</p>
                            </div>

                            <div className='flex gap-3 flex-wrap'>
                                <span className='px-3 py-1 text-yellow-800 border-3 border-yellow-300 bg-white rounded-xl'>
                                    Ideal badge
                                </span>
                                <span className='px-3 py-1 text-yellow-800 border-3 border-yellow-300 bg-white rounded-xl'>
                                    Ideal badge
                                </span>
                                <span className='px-3 py-1 text-yellow-800 border-3 border-yellow-300 bg-white rounded-xl'>
                                    Ideal badge
                                </span>
                                <span className='px-3 py-1 text-yellow-800 border-3 border-yellow-300 bg-white rounded-xl'>
                                    Ideal badge
                                </span>
                            </div>
                        </div>

                        {/* Background, story container */}
                        <div className='mt-6 border-2 border-sky-300/50 bg-sky-50 rounded-xl p-6'>

                            <h2 className='text-xl lg:text-2xl font-bold text-gray-700 mb-1'>
                                My Story
                            </h2>

                            <div className='mt-4 p-3'>
                                <p className='text-gray-600'>{dog.story}</p>
                            </div>
                        </div>

                    </div>
                
                {/* Why choose me section  */}
                    <div className='border-2 border-yellow-300 rounded-xl p-4 mt-4'>
                    
                        {/* Section title */}
                        <h2 className='text-xl lg:text-2xl font-bold text-gray-700 mb-1'>
                            Why Choose Me?
                        </h2>

                        {/* Why adopt reasons */}
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-3 p-2'>
                            {dog.whyAdopt.map((reason, index) => (
                                <span 
                                    key={index}
                                    className='flex items-center gap-2 bg-sky-100 rounded-xl border-2 border-sky-300/50 p-3'
                                >
                                    <CircleCheck className='h-10 w-10 text-yellow-500' />
                                    {reason}
                                </span>
                            ))}

                        </div>
                        
                    </div>

                {/* Details - energy level, health, training, good with */}
                <div className='border-2 border-yellow-300 rounded-xl p-4 mt-4'>
                    
                    {/* Section title */}
                    <h2 className='text-xl lg:text-2xl font-bold text-gray-700 mb-1'>I'm great for</h2>

                    {/* Good with badges */}
                    <div className='flex gap-3 flex-wrap mt-4'>
                        {goodWithConfig.map(({ key, label, icon: Icon }) =>
                            dog.goodWith[key] ? (
                            <div key={key} className="flex items-center gap-2 border-3 border-yellow-300/50 bg-amber-200 px-3 py-1 rounded-full">
                                <Icon className="w-5 h-5 text-yellow-900" />
                                <span>{label}</span>
                            </div>
                            ) : null
                        )}           
                    </div>

                    {/* Section divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-yellow-300 to-transparent mt-4"></div>

                    {/* Additional information */}
                    <div className='mt-4 flex flex-col gap-3'>

                        {/* Energy levels container icon, label + info */}
                        <div className='flex justify-between p-4 bg-lime-200 rounded-xl'>
                            {/* Energy icon with label */}
                            <div className='flex gap-3 items-center'>
                                <span className='rounded-full p-2 bg-sky-100 border-1 border-sky-300/50'><Activity className='w-3 h-3' /></span>
                                <h2>Energy levels</h2>
                            </div>
                            {/* Energy info */}
                            <p>{dog.energyLevel}</p>
                        </div>

                        {/* Training container icon, label + info */}
                        <div className='flex justify-between p-4 bg-lime-200 rounded-xl'>
                            {/* Training icon with label */}
                            <div className='flex gap-3 items-center'>
                                <span className='rounded-full p-2 bg-sky-100 border-1 border-sky-300/50'><Award className='w-3 h-3' /></span>
                                <h2>Training</h2>
                            </div>
                            {/* Training info */}
                            <p>{dog.trainingLevel}</p>
                        </div>

                        {/* Health status container icon, label + info */}
                        <div className='flex flex-col justify-between p-4 bg-lime-200 rounded-xl'>
                            {/* Health icon with label */}
                            <div className='flex gap-3 items-center'>
                                <span className='rounded-full p-2 bg-sky-100 border-1 border-sky-300/50'><Stethoscope className='w-3 h-3' /></span>
                                <h2>Health status</h2>
                            </div>
                            {/* Health info */}
                            <p className='self-end'>{dog.healthStatus}</p>
                        </div>

                        {/* Last vet check container icon, label + info */}
                        <div className='flex justify-between p-4 bg-lime-200 rounded-xl'>
                            {/* Vet check icon with label */}
                            <div className='flex gap-3 items-center'>
                                <span className='rounded-full p-2 bg-sky-100 border-1 border-sky-300/50'><CalendarHeart className='w-3 h-3' /></span>
                                <h2>Vet-check</h2>
                            </div>
                            {/* Last vet check info */}
                            <p>{formatDate(dog.lastVetCheck)}</p>
                        </div>

                        {/* Grooming needs container icon, label + info */}
                        <div className='flex justify-between p-4 bg-lime-200 rounded-xl'>
                            {/* Grooming icon with label */}
                            <div className='flex gap-3 items-center'>
                                <span className='rounded-full p-2 bg-sky-100 border-1 border-sky-300/50'><Sparkles className='w-3 h-3' /></span>
                                <h2>Grooming</h2>
                            </div>
                            {/* Grooming needs info */}
                            <p>{dog.groomingNeeds}</p>
                        </div>

                        {/* House trained container icon, label + info */}
                        <div className='flex justify-between p-4 bg-lime-200 rounded-xl'>
                            {/* House  icon with label */}
                            <div className='flex gap-3 items-center'>
                                <span className='rounded-full p-2 bg-sky-100 border-1 border-sky-300/50'><House className='w-3 h-3' /></span>
                                <h2>House trained</h2>
                            </div>
                            {/* House trained info */}
                            <p>{dog.houseTrained}</p>
                        </div>

                    </div>

                </div>














            








            {/* Image container - gallery */}
            <div className='grid grid-cols-1 md:grid-cols-2 grid-cols-3 gap-4 mt-4'>
               {dog.images.map((image, index) => (
                        <img 
                            key={index}
                            src={image} 
                            alt={`${dog.name}-${dog.breed}`} 
                            className='w-full h-80 object-cover rounded-xl'
                            
                        />
               ))}
                
            </div>
        



        </Section>

        </>
    )
}

export default DogProfilePage;