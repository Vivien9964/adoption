import StarRating from '../common/StarRating';


const SuccessCard = ({ testimonial }) => {

    return (
        <div
        key={testimonial.id}
        className="flex-1 max-w-sm mx-auto w-full group overflow-hidden
        bg-white rounded-xl shadow-lg border-2 border-transparent"
    >

        {/* Image container with image and badge */}
        <div className="relative w-full aspect-square overflow-hidden">
            <img 
                src={testimonial.image} 
                alt={`${testimonial.dogName} - ${testimonial.name}`}
                className="
                    w-full h-full object-cover
                    group-hover:scale-110 transition-transform duration-500
                "
            />

            <div className="
                    absolute top-4 right-4 rounded-xl px-5 py-2
                    bg-yellow-500 font-semibold text-yellow-900"
            >
                <h2>{testimonial.dogName}</h2>
            </div>
        </div>

        {/* Text content */}
        <div className="p-6">
            {/* Opening quote */}
            <p className="text-gray-700 italic leading-relaxed mb-2">
                <span className="text-yellow-400 text-xl font-semibold">"</span>
                {testimonial.quote}
                <span className="text-yellow-400 text-xl font-semibold">"</span>
            </p>
        </div>

        {/* Divider line */}
        <div className="max-w-[90%] mx-auto h-1 bg-yellow-400 rounded-full mb-4" />

        {/* Adopter data, adoption data, rating  */}
        <div className="flex flex-row">

            {/*Adopter image and name */}
            <div className="flex items-center gap-2 p-2 mb-2">
                <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-12 h-12 object-cover rounded-full border-2 border-yellow-400"
                />
                <div>
                    <p className="text-lg text-gray-700 font-bold">{testimonial.name}</p>
                    <p className="text-md text-yellow-900/60">{testimonial.location}</p>
                </div>
            </div>

        </div>

        {/* Rating and adoption date */}
        <div className="flex justify-between p-4">
                
                <StarRating rating={5} starSize={22}/>
            
                <div className="bg-sky-300/70 px-3 py-2 rounded-full">
                    <p className="text-sm text-gray-700 italic">{testimonial.date}</p>
                </div>
            </div>

    </div>

    )
}

export default SuccessCard;