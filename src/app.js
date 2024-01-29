const express = require('express');
const cors = require('cors');

require('dotenv').config();

const routes = require("./routes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
    });
});

app.use('/api/v1', routes);
app.use(notFound);
app.use(errorHandler);


module.exports = app;
