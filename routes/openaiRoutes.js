const express = require('express');
const { getTranslation } = require('../controllers/openaiController');
const router = express.Router();
const upload = multer({ dest: 'uploads/' });
router.post('/getTranslation', upload.single('audio'), getTranslation);

module.exports = router;

//  