const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);



const getTranslation = async (req, res) => {
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

module.exports = { getTranslation };