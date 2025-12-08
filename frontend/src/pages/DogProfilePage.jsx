import { useParams, useNavigate } from 'react-router-dom';
import dogsData from '../data/dogsData';
import Section from '../components/layout/Section';
import { MapPin, Calendar } from 'lucide-react';

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
        return `With us since ${newDate.toLocaleString('en-US', { month: "short"  })} ${newDate.getFullYear()}`;
    }



    return (
        <>
        {/* Main content container */}
        <Section padding='normal' background='gray'>

            {/* Welcome badge */}
                <div className='bg-yellow-200 mx-auto w-[80%] rounded-full text-center p-4 mb-3'>
                    <h1 className='text-2xl md:text-4xl font-bold text-gray-800 mb-2' >Hello, I'm {dog.name}!</h1>
                    <p className='text-gray-600'>I'm very happy that you are here, let me introduce myself.</p>
                </div>

            {/* Profile information */}
            <div className='border-2 border-yellow-300 rounded-xl p-3'>

                <div className='p-2'>
                    <h2 className='text-xl md:text-2xl lg:text-5xl font-bold text-gray-700'>{dog.name}</h2>
                    <p className='text-lg text-gray-500'>{dog.breed}</p>
                </div>

                {/* Breed, age, gender container */}
                <div className='grid grid-cols-2 lg:max-w-[40%] gap-3 lg:gap-5 mx-auto mb-4 p-3'>
                                
                    {/* Age container */}
                    <div className='text-center p-3 bg-yellow-200 border-2 border-gray-700 rounded-2xl'>
                        <p className='mb-1 text-xs tracking-wide font-semibold uppercase text-yellow-900/70'>Age</p>
                        <p className='text-lg leading-tight font-bold text-gray-800'>{dogAge}</p>
                    </div>

                    {/* Gender container */}
                    <div className='text-center p-3 bg-yellow-200 border-2 border-gray-700 rounded-2xl'>
                        <p className='mb-1 text-xs tracking-wide font-semibold uppercase text-yellow-900/70'>Gender</p>
                        <p className='text-lg leading-tight font-bold text-gray-800'>
                            {dog.gender}
                        </p>
                    </div>

                    {/* Size container */}
                    <div className='text-center p-3 bg-yellow-200 border-2 border-gray-700 rounded-2xl'>
                        <p className='mb-1 text-xs tracking-wide font-semibold uppercase text-yellow-900/70'>Size</p>
                        <p className='text-lg leading-tight font-bold text-gray-800'>{dog.size}</p>
                    </div>

                    {/* Weight container */}
                    <div className='text-center p-3 bg-yellow-200 border-2 border-gray-700 rounded-2xl'>
                        <p className='mb-1 text-xs tracking-wide font-semibold uppercase text-yellow-900/70'>Weight</p>
                        <p className='text-lg leading-tight font-bold text-gray-800'>{dog.weight}kg</p>
                    </div>

                </div>

                {/* Additional information container - weight, size, location */}
                <div className='flex flex-1 flex-wrap justify-center gap-2 mb-4'>
                    <span className='px-3 py-1.5 flex items-center gap-1 bg-yellow-200 text-yellow-900 rounded-full text-xs font-bold border-2 border-yellow-300'>
                        <MapPin className='w-3 h-3' />
                        {dog.location}
                    </span>
                    <span className='px-3 py-1.5 flex items-center gap-1 bg-yellow-200 text-yellow-900 rounded-full text-xs font-bold border-2 border-yellow-300'>
                        <Calendar className='w-3 h-3' />
                        {formatDate(dog.dateAdded)}
                    </span>
                </div>

                {/* Dog description */}
                <div className='bg-sky-100 rounded-lg md:max-w-[50%] lg:max-w-[60%] mx-auto border-2 border-gray-700 p-3'>
                    <p className='text-gray-600 text-md leading-relaxed'>
                        {dog.description}
                    </p>   
                </div>

                {/* CTA button, fee information */}
                <div className='flex flex-col justify-center items-center gap-4 mt-4'>
                <button className='bg-yellow-400 text-yellow-900 rounded-lg p-4 text-yellow-900 font-bold'>
                    {`Apply to adopt ${dog.name}`}
                </button> 
                <p className='text-sm text-gray-600'>Adoption is <strong>FREE</strong></p>
                </div>                

            </div>


            {/* Story container */}
            <div className='mt-3'>

                <h2 className='text-lg md:text-xl lg:text-2xl font-bold text-gray-700'>
                    Why did {dog.name} ended up with us?
                </h2>

                <div>
                    <p>{dog.story}</p>
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