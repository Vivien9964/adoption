import HeroSection from '../components/home/HeroSection';
import ChooseUsSection from '../components/home/ChooseUsSection';
import FeaturedPetsSection from '../components/home/FeaturedPetsSection';
import AdoptionGuideSection from '../components/home/AdoptionGuideSection';
import VirtualAdoption from '../components/home/VirtualAdoption';
import EventsSection from '../components/home/EventsSection';
import SuccessStories from '../components/home/SuccessStories';
import QuickDonationModal from '../components/virtualAdoption/QuickDonationModal';
import DonationSuccessCard from '../components/virtualAdoption/DonationSuccessCard';
import { useState } from 'react';


const HomePage = () => {

    // States to toggle modal and success card and set donation amount
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ isSuccessCardOpen, setIsSuccessCardOpen] = useState(false);
    const [ donationAmount, setDonationAmount ] = useState(0);
    const [ isMonthly, setIsMonthly ] = useState(false);

    // Function to handle successful donations
    const handleDonationSuccess = (amount, isMonthly) => {
        setDonationAmount(amount);
        setIsModalOpen(false);
        setIsSuccessCardOpen(true);
        setIsMonthly(isMonthly);
    }

    return(
        <>

            <HeroSection onDonateClick={() => setIsModalOpen(true)} />

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
                buttonHref="/schedule-meeting"
                imageSrc="/images/AdoptStepTwo.jpg"
                imageAlt="Schedule a visit"
                reversed={true}
                backgroundColor="gray"
                decorationColor="bg-sky-200"
           />

           <VirtualAdoption />
           <EventsSection />
           <SuccessStories />


           <QuickDonationModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                target={{ name: "Our shelter"}}  // No specific target -> general donation
                onSuccess={handleDonationSuccess}
            />

            <DonationSuccessCard 
                isOpen={isSuccessCardOpen}
                onClose={() => setIsSuccessCardOpen(false)}
                amount={donationAmount}
                target={{ name: "Our shelter" }} 
                isMonthly={isMonthly} 
            />
        
        </>
    )
}

export default HomePage;