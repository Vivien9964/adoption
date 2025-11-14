import HeroSection from '../components/home/HeroSection';
import ChooseUsSection from '../components/home/ChooseUsSection';
import FeaturedPetsSection from '../components/home/FeaturedPetsSection';
import AdoptionGuideSection from '../components/home/AdoptionGuideSection';
import VirtualAdoption from '../components/home/VirtualAdoption';
import EventsSection from '../components/home/EventsSection';

const HomePage = () => {

    return(
        <>

            <HeroSection />

           <ChooseUsSection />

           <FeaturedPetsSection />

           <AdoptionGuideSection  
                title="Paws, Click and Fall in Love!"
                description="
                    Discover our amazing dogs waiting for a second chance. 
                    Read their stories and see who might be the perfect match for you.
                    Their journeys might lead them straight to your heart!
                "
                buttonText="View Dogs"
                buttonHref="/dogs"
                imageSrc="/images/AdoptStepOne.jpg"
                imageAlt="View dog profiles"
                reversed={false}
                backgroundColor="yellow"
                decorationColor="bg-yellow-200"
           />

            <AdoptionGuideSection  
                title="Schedule a visit"
                description="
                    Found a dog that you would like to meet? Schedule a visit to our shelter. 
                    You can ask questions, go for a walk, play and see how your personalities match."
                buttonText="Schedule a visit"
                buttonHref="/appointment"
                imageSrc="/images/AdoptStepTwo.jpg"
                imageAlt="Schedule a visit"
                reversed={true}
                backgroundColor="gray"
                decorationColor="bg-sky-200"
           />

           <VirtualAdoption />
           <EventsSection />
        
        </>
    )
}

export default HomePage;