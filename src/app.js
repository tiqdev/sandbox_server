const express = require('express');
const cors = require('cors');
require('dotenv').config();
const routes = require("./routes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const connectDB = require("./config/db");

// Connect to MongoDB   
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the Sandbox API',
    });
});

app.use('/api/v1', routes);
app.use(notFound);
app.use(errorHandler);


module.exports = app;
