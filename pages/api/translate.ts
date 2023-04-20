import openai from 'openai';
import { NextApiRequest, NextApiResponse } from 'next';

type TranslationRequestBody = {
  prompt: string;
};

type TranslationResponseBody = {
  translatedText: string;
};



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TranslationResponseBody>
) {
  const apiKey = process.env.GPT_KEY;
  const { prompt } = req.body as TranslationRequestBody;
  const response = await openai.Completion.create({
    engine: 'text-davinci-002',
    prompt,
    max_tokens: 60,
    temperature: 0.7,
    n: 1,
    stop: '\n',
    api_key: apiKey,
  });

  const translatedText = response.choices[0].text;
  res.status(200).json({ translatedText })
}

