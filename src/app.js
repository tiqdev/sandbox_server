const express = require('express');
const cors = require('cors');

require('dotenv').config();

const routes = require("./routes");
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
    });
});

app.use('/api/v1', routes);


module.exports = app;
