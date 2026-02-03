import Button from "../common/Button";
 

const HeroDonations = () => {

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

        {/* Hero image */}
        <div 
            className="absolute inset-0 -z-10"
            style={{
                backgroundImage: `url("/images/Donation-hero.jpg")`,
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
                    Can't Adopt Now?  <br />
                    You can still change lives!
                </h1>

                <p className="max-w-2xl mx-auto mb-10 md:mb-12 text-lg md:text-xl lg:text-2xl text-gray-100 drop-shadow-md">
                    Every form of support makes a real difference.
                </p>

                {/* CTA buttons  */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
                    
                    {/* Donate for dogs button */}
                        <Button
                            variant="accent"
                            size="large"
                            className="group"
                        >
                            Donate for Dogs
                        </Button>
                    

                    {/* Donate for shelter button */}
                        <Button
                            variant="accent"
                            size="large"
                            className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20"
                        >
                            Donate for Us
                        </Button>
                    
                </div>

            </div>
        
        </div>
    </section>
    )
}

export default HeroDonations;