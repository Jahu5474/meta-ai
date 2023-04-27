import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

type OpenAIResponse = {
  choices: {
    text: string;
  }[];
};


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data } = await axios.post<OpenAIResponse>(
      'https://api.openai.com/v1/models/text-davinci-003/completions',
      {
        prompt: 'What is the meaning of life?',
        max_tokens: 60,
        n: 1,
        stop: '\n',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.GPT_KEY}`,
        },
      }
    );

    res.status(200).json(data.choices[0].text);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}
