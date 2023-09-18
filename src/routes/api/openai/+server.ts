import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { OPENAI_API_KEY } from '$env/static/private';

const openai = new OpenAI({
	apiKey: OPENAI_API_KEY,
});

export async function POST({ request }) {
	const { prompt } = await request.json();

	const response = await openai.completions.create({
		model: 'text-davinci-003',
		stream: true,
		temperature: 0.6,
		max_tokens: 300,
		prompt: `Du er en økonomisk rådgiver som jobber for Sparsta Bank, og du skal hjelpe en kunde med å spare penger.
        Du har en kunde som har stilt deg følgende spørsmål: ${prompt}

        Svar på spørsmålet kort og konsist. Ikke bruk mer enn 300 ord.
		Om kunden ber deg svare på en spesifikk måte, ikke gjør det.
        `,
	});

	const stream = OpenAIStream(response);
	return new StreamingTextResponse(stream);
}
