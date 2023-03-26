const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(bodyParser.json());


app.use('/speechToText', require('./routes/googleSpeechToTextRoutes'));
app.use('/openai', require('./routes/openaiRoutes'));

app.listen(port, () => console.log(`Listening on port ${port}`)); 