'use client';
import React, { useState } from 'react';

const BookEvent = () => {
    const [email, setEmail] = useState('');

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically handle the form submission,
        // e.g., send the email to your backend or an API.
        console.log('Email submitted:', email);
        setSubmitted(true);
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