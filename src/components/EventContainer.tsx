import React, { useState } from 'react';
import EventRow from './EventRow';
import LoadMore from './LoadMore';
import historicalData from '../data/data.json';

const numEvents = 3; // number of events to be displayed at one time

const EventContainer: React.FC = () => {
    const [eventsToShow, setEventsToShow] = useState(numEvents);

    // iterate eventsToShow by numEvents
    const loadMoreEvents = () => {
        setEventsToShow((prevEventsToShow) => prevEventsToShow + numEvents);
    };

    return (
        <div>
            {/* initial event display */}
            <EventRow events={historicalData.events.slice(0, eventsToShow)} />

            {/* load more events button */}
            {eventsToShow < historicalData.events.length && (
                <LoadMore onClick = {loadMoreEvents} />
            )}
        </div>
    );
};

export default EventContainer;