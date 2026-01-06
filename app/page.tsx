import React from 'react';
import ExploreBtn from '@/components/ExploreBtn';
import EventCard from '@/components/EventCard';
import { events } from '@/lib/constants';

const Page = () => {
  return (
    <section>
      <h1 className='text-center'>This hub for every dev events you mustn&apos;t miss!</h1>
      <p className='mt-5 text-center'>Hackathons, Meetups and Conferences. All in one place.</p>

      <ExploreBtn />

      <div className='mt-20 space-y-7'>
        <h3>Featured Events</h3>
        <ul className='events'>
          {events.map((event) => (
            <li key={event.title}>
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Page;