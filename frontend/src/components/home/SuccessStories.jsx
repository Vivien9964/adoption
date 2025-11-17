import Section from '../layout/Section';
import SuccessStatCard from '../common/SuccessStatCard';
import SuccessCard from '../common/SuccessCard';
import testimonialsData from '../../data/testimonialsData';

const SuccessStories = () => {

    return (
        <Section padding="normal" background="gray">

            {/* Header with title and subtitle */}
            <div className="text-center mb-12">
                <h2 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-900">
                    Happy <span className="text-amber-500">Tails</span>
                </h2>
                <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600">
                Every adoption is a new beginning! 
                Read the success stories of people finding their pawsome friend in our shelter.
                </p>
            </div>

            {/* Statistics container with cards */}
            <div className="flex justify-center text-center flex-col sm:flex-row gap-4 mb-16">
                {/* Statistics cards */}
                <SuccessStatCard title="250+" description="Successful Adoptions" id={1} />
                <SuccessStatCard title="100%" description="Happy Adopters" id={2} />
                <SuccessStatCard title="10 years" description="Changing Lives" id={3} />
            </div>

            {/* Success story container with cards */}
            <div className="flex flex-wrap flex-col md:flex-row gap-6 md:gap-8 justify-center ">
                
                
                {/* Success story card */}
                {testimonialsData.map((testimonial) => (
                    <SuccessCard testimonial={testimonial} />
                ))}


            </div>

        </Section>
    )
}

export default SuccessStories;