import { Star } from 'lucide-react';


const StarRating = ({ rating = 5, maxStars = 5, starSize = 20}) => {

   
   
   return (
        <div className="flex gap-1">
            {[...Array(maxStars)].map((_, i) => (
                <Star
                    key={i}
                    size={starSize}
                    className={i < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"}
                />
            ))}
        </div>
   );
}


export default StarRating;