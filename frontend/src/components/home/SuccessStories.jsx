import Section from '../layout/Section';
import SuccessStatCard from '../common/SuccessStatCard';

const SuccessStories = () => {

    return (
        <Section padding="normal" background="gray">

            {/* Header with title and subtitle */}
            <div className="text-center mb-4">
                <h2 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-900">
                    Happy <span className="text-amber-500">Tails</span>
                </h2>
                <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600">
                Every adoption is a new beginning! 
                Read the success stories of people finding their pawsome friend in our shelter.
                </p>
            </div>

            {/* Statistics container with cards */}
            <div className="flex justify-center text-center flex-col sm:flex-row gap-4">
                {/* Statistics cards */}
                <SuccessStatCard title="250+" description="Successful Adoptions" id={1} />
                <SuccessStatCard title="100%" description="Happy Adopters" id={2} />
                <SuccessStatCard title="10 years" description="Changing Lives" id={3} />
            </div>

            {/* Success story container with cards */}
            <div>

                {/* Success story card */}
                <div className="bg-yellow-500">

                    <div className="relative overflow-hidden">
                        <img 
                            src="/images/AdoptStepOne.jpg" 
                            className="
                            w-24 h-24 object-cover 
                            group-hover:scale-110 transition-transform duration-500"
                            alt="" 
                        />
                    </div>

                </div>

            </div>

        </Section>
    )
}

export default SuccessStories;