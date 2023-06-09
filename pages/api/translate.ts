import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const completion = await openai.createChatCompletion({
    model: "gpt3.5-turbo",
    messages: req.body.messages,

  })
  console.log(configuration)

  res.status(200).json({ result: completion.data })
}

