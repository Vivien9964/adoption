import Section from '../layout/Section';
import eventsData from '../../data/eventsData';
import EventCard from '../common/EventCard';



const EventsSection = () => {





    return (
        <Section padding="normal" background="yellow">

            <div className="
                    flex items-center justify-center flex-col md:flex-row lg:flex-row gap-8 md:gap-10 lg:gap-14"
            >
               {eventsData.map((event) => {
                    return <EventCard event={event} />
               })}
            </div>

        </Section>
    )
}

export default EventsSection;