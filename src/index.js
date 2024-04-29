const app = require('./app');
const express = require('express');

const port = process.env.PORT || 5000;

app.use(express.static('public'));
app.listen(port, () => {
    /* eslint-disable no-console */
    console.log(`Listening: http://localhost:${port}`);
    /* eslint-enable no-console */
});
