// backend/routes/reservations.js
const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

// GET all reservations
router.get('/', async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.json(reservations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST create a new reservation
router.post('/', async (req, res) => {
    const reservation = new Reservation({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        time: req.body.time,
        guests: req.body.guests,
    });

    try {
        const newReservation = await reservation.save();
        res.status(201).json(newReservation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Additional route to get unavailable times
router.get('/unavailable-times', async (req, res) => {
    // Logic to fetch unavailable times
    res.json([]);
});

module.exports = router;