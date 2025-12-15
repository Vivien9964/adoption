import Section from "../components/layout/Section";
import Filter from "../components/layout/Filter";

const ScheduleMeetingPage = () => {

    return (
        <>
        {/* Page title */}
        <div className="bg-white mt-8 flex flex-col justify-center items-center gap-3">
            <h1 className="text-2xl md:text-3xl lg:text-4xl text-gray-700 font-bold">Schedule a meeting</h1>
            <p className="text-md text-gray-500">Book a time to meet your new best friend!</p>
        </div>
        <div className="h-px bg-yellow-300 mt-6"></div>

        {/* Main content  */}
        <Section padding="normal" background="blue" >

            <Filter />

        </Section>

        </>
    
    )
}

export default ScheduleMeetingPage;