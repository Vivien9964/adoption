import Section from '../layout/Section';
import eventsData from '../../data/eventsData';
import EventCard from '../common/EventCard';



const EventsSection = () => {



    return (
        <Section padding="normal" background="yellow">

            <h2 className="mb-8 text-center text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-900">
                Upcoming <span className="text-amber-500">Events</span>
            </h2>

            <div className="
                    flex flex-wrap items-center justify-center flex-col lg:flex-row gap-8 md:gap-10 lg:gap-14"
            >
               {eventsData.map((event) => {
                    return <EventCard key={event.id} event={event} />
               })}
            </div>

        </Section>
    )
}

export default EventsSection;