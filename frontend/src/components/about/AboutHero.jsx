const AboutHero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

        {/* Hero image */}
        <div 
            className="absolute inset-0 -z-10"
            style={{
                backgroundImage: `url("/images/About-hero.jpg")`,
                backgroundSize: "cover",
                backgroundPosition: "center 30%",
                backgroundRepeat: "no-repeat"
            }}
        >

        <div className="absolute inset-0 bg-black/50" />
        </div>
        
        {/* Hero  content */}
        <div className="relative z-10 w-full">

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

                {/* Main title with text */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mt-8 mb-8 drop-shadow-lg">
                    About PawSome Shelter                
                </h1>

                <p className="max-w-2xl mx-auto mb-10 md:mb-12 text-lg md:text-xl lg:text-2xl text-gray-100 drop-shadow-md">
                    Changing lives - One paw at a time!
                </p>


            </div>
        
        </div>
    </section>
    )
}

export default AboutHero;