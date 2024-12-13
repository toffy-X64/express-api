const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const {init} = require('./src/config/db');
const routes = require('./src/routes');
const errorHandler = require('./src/utils/errorHandler');

dotenv.config();

const PORT = process.env.PORT
const app = express()

app.use(cors());
app.use(express.json());
app.use('/', routes)
app.use(errorHandler)

init()

app.listen(PORT, async () => {
    console.log(`Server started on PORT - ${PORT}`)
})