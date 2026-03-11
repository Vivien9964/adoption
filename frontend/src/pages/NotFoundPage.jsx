import { Link } from "react-router-dom";
import Section from "../components/layout/Section";
import NotFoundPuppy from "../../public/images/NotFoundPuppy.png";


const NotFoundPage = () => {

    return (
        <Section padding="normal" background="blue">

            {/* Main info card with two boxes */}
            <div className="
                    max-w-2xl md:px-0 mx-auto flex flex-col md:flex-row overflow-hidden rounded-3xl border-2 border-sky-200 shadow-[6px_6px_0px_#bae6fd]
            ">

                {/* Box with 404 message */}
                <div className="
                        p-6 md:p-10 lg:p-12 flex-1 
                        bg-sky-100 border-r-0 md:border-r-2 border-b-2 md:border-b-0
                        border-dashed border-sky-200"
                >

                    {/* 404 sign */}
                    <div className="
                            mb-4 font-black font-fredoka text-[clamp(80px,14vw,110px)] leading-none tracking-tighter text-sky-300/80">
                        404
                    </div>
                    {/* Title */}
                    <h2 className="mb-4 text-lg leading-12 md:text-3xl text-sky-800 font-bold">
                        Ooops, this page ran off to play!
                    </h2>
                   
                </div>

                {/* Box with icon */}
                <div className="p-4 md:p-10 flex-1 bg-yellow-200">

                    <div className="rounded-full bg-amber-300/80 border-4 border-white">
                        <img  
                            src={NotFoundPuppy} alt="Cartoon illustration of a puppy"
                            className="mx-auto w-28 h-28 md:w-36 md:h-36 object-cover " 
                        />
                    </div>  

                    {/* Description */}
                    <p className="mt-6 text-md text-yellow-700">
                        Looks like this page went on an advanture. 
                        Don't worry, our other pages are well-behaved!
                    </p>

                </div>
            </div>

            {/* CTA buttons container */}
            <div className="
                    mt-4 px-4 py-6 flex flex-col md:flex-row justify-center gap-3 md:gap-8">

                    {/* Home */}
                    <Link
                        to="/"
                        className="
                            py-3 px-6 rounded-full text-sky-800 font-black
                            bg-sky-50 border-2 border-sky-200
                            hover:bg-yellow-300 hover:border-yellow-400
                            hover:-rotate-2 hover:scale-105 hover:shadow-md
                            hover:text-yellow-900
                            transition-all duration-300"
                    >
                        Home
                    </Link>

                    {/* Dogs */}
                    <Link
                        to="/dogs"
                        className="
                            py-3 px-6 rounded-full text-sky-800 font-black
                            bg-sky-50 border-2 border-sky-200
                            hover:bg-yellow-300 hover:border-yellow-400
                            hover:-rotate-2 hover:scale-105 hover:shadow-md
                            hover:text-yellow-900
                            transition-all duration-300"
                    >
                        Our Dogs

                    </Link>


                    {/* Get Involved */}
                    <Link
                        to="/virtual-adoption"
                        className="
                            py-3 px-6 rounded-full text-sky-800 font-black
                            bg-sky-50 border-2 border-sky-200
                            hover:bg-yellow-300 hover:border-yellow-400
                            hover:-rotate-2 hover:scale-105 hover:shadow-md
                            hover:text-yellow-900
                            transition-all duration-300"
                    >
                        Get Involved

                    </Link>

            </div>

        </Section>
    )
}

export default NotFoundPage;