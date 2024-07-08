import React, { useState } from 'react';
import './Reservations.css';

const Reservations = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        time: '',
        guests: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Reservation created:', data);
            
            // Optionally reset the form after successful submission
            setFormData({
                name: '',
                phone: '',
                email: '',
                time: '',
                guests: ''
            });

        } catch (error) {
            console.error('Error submitting reservation:', error);
        }
    };

    return (
        <div className="reservations_wrapper">
            <div className='reservations'>
                <h2>Table Reservation</h2>
                
                <form onSubmit={handleSubmit} className='reservations_form'>

                    <div className="name_and_phone">
                        <div className='ne_content'>
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='ne_content'>
                            <label htmlFor="phone">Phone:</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    
                    <div className='content'>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className='content'>
                        <label htmlFor="time">Time:</label>
                        <input
                            type="time"
                            id="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='content'>
                        <label htmlFor="guests">Number of Guests:</label>
                        <input
                            type="number"
                            id="guests"
                            name="guests"
                            value={formData.guests}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit">Submit Reservation</button>
                </form>
            </div>
        </div>
    );
};

export default Reservations;