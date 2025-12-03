const PetCardDogsPage = ({dog}) => {

    return (
    
        <div className="group relative cursor-pointer">

            {/* Inner main container that holds the main content */}
            <div className="text-center bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 ">
                            
                {/* Cover background for profile card */}
                <div className='relative h-40 bg-sky-200 overflow-hidden'></div>
                            
                {/* Rounded profile picture  */}
                <div className='flex justify-center -mt-16 mb-4'>
                    <div className='relative'>
                        <div className='h-32 w-32 rounded-full border-4 border-white shadow-xl overflow-hidden'>
                            <img src={dog.image} className='h-full w-full object-cover' alt={`${dog.name} - ${dog.breed}`} />
                        </div>
                    </div> 
                </div>

                {/* Header with name */}
                <div className='px-6 pb-6 text-center'>
                    <h1 className='mb-2 text-4xl font-bold text-gray-800'>{dog.name}</h1>
                </div>

                {/* Content divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-yellow-300 to-transparent mb-4"></div>

                {/* Breed, age, gender container */}
                <div className='grid grid-cols-3 gap-3 mb-4 p-3'>
                                
                    {/* Breed container */}
                    <div className='text-center p-3 bg-yellow-200 border-2 border-gray-700 rounded-2xl'>
                        <p className='mb-1 text-xs tracking-wide font-semibold uppercase text-yellow-900/70'>Breed</p>
                        <p className='text-lg leading-tight font-bold text-gray-800'>{dog.breed.split(" ")[0]}</p>
                    </div>

                    {/* Age container */}
                    <div className='text-center p-3 bg-yellow-200 border-2 border-gray-700 rounded-2xl'>
                        <p className='mb-1 text-xs tracking-wide font-semibold uppercase text-yellow-900/70'>Age</p>
                        <p className='text-lg leading-tight font-bold text-gray-800'>{dog.age === 1 ? `${dog.age} year` : `${dog.age} years`}</p>
                    </div>

                    {/* Gender container */}
                    <div className='text-center p-3 bg-yellow-200 border-2 border-gray-700 rounded-2xl'>
                        <p className='mb-1 text-xs tracking-wide font-semibold uppercase text-yellow-900/70'>Gender</p>
                        <p className='text-lg leading-tight font-bold text-gray-800'>{dog.gender}</p>
                    </div>
                </div>

                {/* Additional information container - weight, size, location */}
                <div className='flex flex-1 flex-wrap justify-center gap-2 mb-4'>
                    <span className='px-3 py-1.5 bg-yellow-200 text-yellow-900 rounded-full text-xs font-bold border-2 border-yellow-300'>
                        {dog.size}
                    </span>
                    <span className='px-3 py-1.5 bg-yellow-200 text-yellow-900 rounded-full text-xs font-bold border-2 border-yellow-300'>
                        {dog.weight} kg
                    </span>
                    <span className='px-3 py-1.5 flex items-center gap-1 bg-yellow-200 text-yellow-900 rounded-full text-xs font-bold border-2 border-yellow-300'>
                        <MapPin className='w-3 h-3' />
                        {dog.location}
                    </span>

                </div>

                {/* Dog description */}
                <p className='mb-5 px-2 text-gray-600 text-sm text-center leading-relaxed'>
                    {dog.description}
                </p>                        

                {/* CTA button */}
                <button className='
                    w-[70%] py-3.5 px-6 rounded-2xl mb-4
                    bg-yellow-500 hover:bg-yellow-600 text-yellow-900 font-black text-base
                    transition-all duration-300 shadow-md hover:shadow-xl border-2 border-yellow-500'
                >
                    `Meet ${dog.name}`
                </button>
    
            </div>
        </div>
        
    )
}

export default PetCardDogsPage;