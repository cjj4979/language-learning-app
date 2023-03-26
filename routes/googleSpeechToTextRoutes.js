const express = require('express');
const multer = require('multer');

const { getTranslation } = require('../controllers/googleSpeechToTextController');
const router = express.Router();

router.post('/transcribe', upload.single('audio'), transcribe);

module.exports = router;