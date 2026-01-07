'use client';
import React, { useState } from 'react';
import { createBooking } from '@/lib/actions/booking.action';
import posthog from 'posthog-js';

const BookEvent = ({ eventId, slug }: { eventId: string; slug: string }) => {
    const [email, setEmail] = useState('');

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { success } = await createBooking({ eventId, slug, email });

        if (success) {
            setSubmitted(true);
            posthog.capture('event_booked', { eventId, slug, email });
        } else {
            console.error("Booking creation Failed!");
            posthog.captureException("Booking creation Failed!");
        }
    }

    return (
        <div id='book-event'>
            {submitted ? (
                <p className='text-sm'>Thank You for Signing Up!</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='email'>Email Address</label>
                        <input
                            id='email'
                            type='email'
                            placeholder='Enter the Email Address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button type='submit' className='button-submit'>Submit</button>
                </form>
            )}
        </div>
    )
}

export default BookEvent;