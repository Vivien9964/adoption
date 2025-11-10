import Button from '../components/common/Button'
import Section from '../components/layout/Section'
import HeroSection from '../components/home/HeroSection';
import ChooseUsSection from '../components/home/ChooseUsSection';
import FeaturedPetsSection from '../components/home/FeaturedPetsSection';
import AdoptionGuideOneSection from '../components/home/AdoptionGuideOneSection';

const HomePage = () => {

    return(
        <>

            <HeroSection />
           <ChooseUsSection />
           <FeaturedPetsSection />
           <AdoptionGuideOneSection />
        </>
    )
}

export default HomePage;