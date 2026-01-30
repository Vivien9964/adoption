import { urgentCareDogs } from "../../data/urgentCareData";
import UrgentFeaturedCard from "./UrgentFeaturedCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const UrgentFeaturedCarousel = () => {

    return (
        <div className="w-full px-8">

            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                navigation={true}
                loop={true}
                autoplay={{ 
                    delay: 2000, 
                    disableOnInteraction: false, 
                    pauseOnMouseEnter: true
                }}
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
                className="py-8"
            >
                {urgentCareDogs.map((dog) => (
                    <SwiperSlide key={dog.id}>
                        <UrgentFeaturedCard dog={dog} />
                    </SwiperSlide>
                ))}
            </Swiper>

        </div>
    )
}

export default UrgentFeaturedCarousel;