import Section from "../layout/Section";
import { MapPin, Phone, Mail, Clock } from "lucide-react";


const ContactUsSection = () => {


    return (
        <Section>
            
             {/* Header */}
             <div className="mb-12 text-center">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                    <span className="text-yellow-400">Contact</span>{" "}
                    <span className="text-yellow-900">Us</span>
                </h2>
                <p className="mt-6 text-lg md:text-xl text-gray-600">
                    Have a question about adoption, volunteering, or our dogs? Reach out anytime.
                </p>
            </div>

            {/* Main content */}
            <div className="p-4 md:p-8 flex flex-col md:flex-row gap-6">

                {/* Contact info */}
                <div className="flex flex-col gap-4 rounded-xl">
                    {/* Address */}
                    <div>
                        <div className="flex items-center justify-center gap-2">
                            <MapPin className="w-8 h-8 text-yellow-900" />
                            <h3>Address</h3>
                        </div>
                        <p>123 Street Name</p>
                        <p>Arad, Romania</p>
                    </div>

                    {/* Phone */}
                    <div>
                        <div className="flex items-center justify-center gap-2">
                            <Phone className="w-8 h-8 text-yellow-900" />
                            <h3>Phone</h3>
                        </div>
                        <p>+40 154 123 456</p>
                    </div>

                    {/* Email */}
                    <div>
                        <div className="flex items-center justify-center gap-2">
                            <Mail className="w-8 h-8 text-yellow-900" />
                            <h3>Email</h3>
                        </div>
                        <p>info@pawsome.com</p>
                    </div>

                    {/* Hours */}
                    <div>
                        <div className="flex items-center justify-center gap-2">
                            <Clock className="w-8 h-8 text-yellow-900" />
                            <h3>Hours</h3>
                        </div>
                        <p>Mon-Fri: 8-18 </p>
                        <p>Sat-Sun: 10-16 </p>
                    </div>
                </div>








            </div>




        </Section>
    )
}


export default ContactUsSection;