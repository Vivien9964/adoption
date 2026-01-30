import { Link } from 'react-router-dom';

import Section from '../layout/Section';
import Button from '../common/Button';
import PetCardCarousel from '../pets/PetCardCarousel';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { usePets } from '../../context/PetsContext';



const FeaturedPetsSection = () => {

    const { getFeaturedPets } = usePets();
    const featuredPets = getFeaturedPets(); 

    return (
        <Section background="blue" padding="normal" maxWidth="7xl" id="featured-pets">

            {/* Header */}
            <div className="mb-12 md:mb-16 text-center">
                <h2 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-900">
                    Meet Your <span className="text-amber-500"> Pawsome Friend </span>
                </h2>
                <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-700"> 
                    These special dogs are ready to go HOME. Click to learn more about them!
                </p>
            </div>

            {/* Carousel from Swiper */}
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={24}
                slidesPerView={1}
                centeredSlides={true}
                loop={true}
                autoplay={{
                    delay: 2000,
                    disabledOnInteraction: false,
                    pauseOnMouseEnter: true
                }}
                navigation={true}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 24
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    },
                }}
                className="pb-12"
            >
                {featuredPets.map((pet) => (
                    <SwiperSlide key={pet.id}>
                        <PetCardCarousel pet={pet} />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* View all pets button */}
            <div className="mt-8 md:mt-12 text-center">
                <Link to="/dogs">
                <Button variant="accent" size="large" className="cursor-pointer">
                    See All Dogs
                </Button>
                </Link>

            </div>

        </Section>
    )
}

export default FeaturedPetsSection;