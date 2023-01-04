import dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

//types
import { Model } from "../types";

dotenv.config();

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY || "",
});

const openai = new OpenAIApi(config);

const BotOn = async (prompt: string, model: Model) => {
  try {
    const res = await openai.createCompletion({
      prompt,
      model,
      temperature: 0.5,
      max_tokens: 500,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
      stop: ['"""'],
    });

    const newTesxt = res.data.choices[0].text;

    return newTesxt;
  } catch (error) {
    console.log(error);
    return "";
  }
};

export { BotOn };
