// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');

// Creates a client
const client = new speech.SpeechClient();

async function quickstart() {
    /**
     * TODO(developer): Uncomment the following lines before running the sample.
     */
    const gcsUri = 'gs://yhack_2023_language_learning_app/holland.mp3';
    const encoding = 'MP3';
    const sampleRateHertz = 16000;
    const languageCode = 'en-US';

    const config = {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
    };

    const audio = {
    uri: gcsUri,
    };

    const request = {
    config: config,
    audio: audio,
    };

    // Detects speech in the audio file. This creates a recognition job that you
    // can wait for now, or get its result later.
    const [operation] = await client.longRunningRecognize(request);
    // Get a Promise representation of the final result of the job
    const [response] = await operation.promise();
    const transcription = response.results
    .map(result => result.alternatives[0].transcript)
    .join('\n');
    console.log(`Transcription: ${transcription}`);
}
quickstart();



const transcribe = async (req, res) => {
    try {
        console.log("Request body: " + req.body.text);
        const text = req.body.text; //req.body.text;  // get the text from the req.body object
        const prompt = "Translate following sentence into english with the meaning for each word: \n\n" + text;
        console.log("Prompt: " + prompt);
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 0,
            max_tokens: 1000,
        });
        res.status(200).json( response.data.choices[0].text);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports = { transcribe };