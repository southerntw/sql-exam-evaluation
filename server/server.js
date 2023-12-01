const express = require('express');
const routes = require('./routes/index');
const db = require('./config/Database');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const port = 3001;

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

require('dotenv').config();
console.log(require('dotenv').config())
const app = express();

app.use(cors({ credentials:true, origin :`http://localhost:${port}`}));
app.use(cookieParser())
app.use(express.json());
app.use(routes);
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.json({
        error: err
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});