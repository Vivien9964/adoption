import AboutHero from "../components/about/AboutHero";
import MissionStats from "../components/about/MissionStats";
import MissionStorySection from "../components/about/MissionStorySection";
import AnnualImpact from "../components/about/AnnualImpact";
import GetInvolvedSection from "../components/about/GetInvolvedSection";
import ContactUsSection from "../components/about/ContactUsSection";

const AboutPage = () => {

    return (

        <>
            <AboutHero />

            <MissionStorySection />

            <MissionStats />

            <AnnualImpact />

            <GetInvolvedSection />

            <ContactUsSection />
        </>

      

    ) 
}

export default AboutPage;