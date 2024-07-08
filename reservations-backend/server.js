const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const uri = 'mongodb+srv://sam:sam2112@cluster1.a58v9n7.mongodb.net/reservationsDB?retryWrites=true&w=majority&appName=Cluster1';
mongoose.connect(uri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define a schema and model for reservations
const reservationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    time: { type: String, required: true },
    guests: { type: Number, required: true }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

// Define routes
app.post('/reservations', async (req, res) => {
    try {
        const newReservation = new Reservation(req.body);
        await newReservation.save();
        res.status(201).send(newReservation);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/reservations', async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.status(200).send(reservations);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
