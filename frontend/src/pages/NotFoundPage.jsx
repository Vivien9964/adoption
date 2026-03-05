import { Link } from "react-router-dom";
import Section from "../components/layout/Section";


const NotFoundPage = () => {

    return (
        <Section padding="normal" background="blue">

            {/* Main info card with two boxes */}
            <div className="
                    max-w-2xl mx-auto flex overflow-hidden rounded-3xl border-2 border-sky-200 shadow-[6px_6px_0px_#bae6fd]
            ">

                {/* Box with 404 message */}
                <div className="p-12 flex-1 bg-sky-100 border-r-2 border-dashed border-sky-200">

                    {/* 404 sign */}
                    <div className="
                            mb-4 font-black font-fredoka text-[clamp(80px,14vw,110px)] leading-none tracking-tighter text-sky-300/80">
                        404
                    </div>
                    {/* Title */}
                    <h2 className="mb-4 text-lg md:text-xl text-sky-800 font-bold">
                        Ooops, this page ran off to play!
                    </h2>
                    {/* Description */}
                    <p className="text-md text-gray-500">
                        Looks like this page went on an advanture. 
                        Don't worry, our other pages are well-behaved!
                    </p>
                </div>

                {/* Box with icon */}
                <div className="p-10 flex-1 bg-yellow-200">

                    <h1>Text</h1>

                </div>
            </div>

        </Section>
    )
}

export default NotFoundPage;