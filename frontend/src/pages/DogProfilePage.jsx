import { useParams, useNavigate } from 'react-router-dom';
import dogsData from '../data/dogsData';
import Section from '../components/layout/Section';
import { MapPin, Calendar, CircleCheck } from 'lucide-react';

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
                                        px-2 py-1 flex items-center gap-1 whitespace-nowrap
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