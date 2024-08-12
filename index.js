
const express = require('express');
const mongoose = require('mongoose');
const { MONGODB_URI } = require('./config/config');
const errorMiddleware = require('./middlewares/error')
const cookieParser = require('cookie-parser');
const cors = require('cors');

const products = require('./routes/product');
const auth = require('./routes/auth');
const booking = require('./routes/booking')
const payment = require('./routes/payment')



// 2. create express app
const app = express();

// middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());


app.use('/api/v1',products);
app.use('/api/v1',auth);
app.use('/api/v1',booking);
// app.use('/api/v1',payment);

app.use(errorMiddleware)

app.get("/api/v1", (req, res) => {
    res.send("Welcome to the Server!");
  });



mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');

        // after connecting to MongoDB, start the server
        app.listen(3001, () => {
            console.log(`Server is running on http://localhost:3001`);
        });
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB', error);
    });

    