import Section from '../layout/Section';
import Button from '../common/Button';

const VirtualAdoption = () => {

    const virtualOptions = [
        {
            id: 1,
            title: "Sponsor a Dog",
            description: "Cover monthly care costs such as grooming and food for a dog of your choice. You can get updates and photos of your sponsored friend!",
            bgColor: "bg-yellow-300/80",
            hoverBg: "group-hover:bg-yellow-300"
        },
        {
            id: 2,
            title: "Donations for All",
            description: "Every and any donation helps! Buy food, toys, medical care, you name it!",
            bgColor: "bg-sky-300/80",
            hoverBg: "group-hover:bg-sky-300"
        },


    ]


    return(
        <Section padding="small" background="gray">

            {/* Header */}
            <div className="flex flex-col items-center text-center gap-6 mb-12 md:mb-16">

                {/* Badge */}
                <div className="
                        inline-flex items-center gap-3 px-6 py-3
                        bg-yellow-300 rounded-full shadow-md
                        hover:shadow-lg hover:scale-105 transition-all duartion-300"
                >
                    
                    {/* Title */}
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-yellow-900">
                        Can't Adopt Now?
                    </h2>
                </div>

                {/* Subtitle */}
                <p className="max-w-3xl text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
                    You can still make a big difference in a dog's life, even from a far!
                    Help us from anywhere with the <strong>Virtual Adoption Program</strong>.
                </p>
            </div>

            {/* Options grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10 md:mb-12">
                {virtualOptions.map((option) => {
                    return (
                        <div
                            key={option.id}
                            className="
                                p-6 md:p-8 rounded-2xl
                                bg-white hover:bg-sky-50/50 text-center
                                border-2 border-transparent hover:border-yellow-300
                                hover:shadow-xl hover:-translate-2
                                transition-all duration-300 cursor-pointer"
                        >


                            {/* Option title */}
                            <h3 className="mb-3 text-xl md:text-2xl font-bold text-yellow-900">
                                {option.title}
                            </h3>

                            {/* Option description*/}
                            <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                                {option.description}
                            </p>
                        </div>
                    )
                })}
            </div>
            
            {/* CTA button */}
            <div className="flex justify-center">
                <Button variant="accent" size="large" href="virtualadoption" className="group">
                    Learn More
                </Button>
            </div>

        </Section>
    )
}


export default VirtualAdoption;