import {Configuration, OpenAIApi} from "openai"

const configuration = new Configuration({
	apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);

const OPEN_AI_EMBEDDING_MODEL = "text-embedding-ada-002"
const OPEN_AI_COMPLETION_MODEL = "gpt-4-turbo-preview"

export const getEmbeddings = async (text) => {
	const response = await openai.createEmbedding({
		model: OPEN_AI_EMBEDDING_MODEL,
		input: text,
	});
	return response.data.data[0].embedding
}

export const getCompletion = async (prompt) => {
	const completion = await openai.createCompletion({
		model: OPEN_AI_COMPLETION_MODEL,
		prompt: prompt,
		max_tokens: 100,
		temperature: 0
	});

	console.log(completion.data.choices)

	return completion.data.choices[0].text
}