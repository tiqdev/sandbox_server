const express = require('express');
const cors = require('cors');
require('dotenv').config();
const routes = require("./routes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const cookieParser = require('cookie-parser');
const connectDB = require("./config/db");

// Connect to MongoDB   
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the Sandbox API',
        apis: [
            "/api/v1/auth",
            "/api/v1/bookmark",
        ],
        createdBy: "Tarık KAYA",
        github: "https://github.com/tiqdev",
        medium: "https://medium.com/@tiqdev",
        linkedin: "https://www.linkedin.com/in/tiqdev/",
        website: "https://tiqdev.com",
        bento: "https://bento.me/tiqdev"
    });
});

app.use('/api/v1', routes);
app.use(notFound);
app.use(errorHandler);


module.exports = app;
