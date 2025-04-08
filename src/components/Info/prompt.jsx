import { GEMINI_API_KEY } from "../../assets/key";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const initialPrompt = `Hey today you are working as a movie recommender and your job is to tell the user about the movie but not just a simple description you have to be creative and give me the answer in under 60 words and a answer which would lure the reader to watch that movie. If you don't have any information about the movie or cannot recommend just return an empty string "" without explanations. Also use some emojies for a good user experieince. Don't start with "Dive into ...", "Explore the ..." Be straight forwards Now here is the details: `
// const initialPrompt = `Act as an enthusiastic movie recommender! 🎬 If you know the movie, reply with a catchy 60-word teaser using emojis to hook the viewer. Example: "Buckle up for [Title]! 💥 A wild ride of [emotion] + [twist] that'll leave you [reaction]. Think [fun comparison] meets [another movie]! 🌟 Don't miss the [iconic scene] scene - pure 🔥! PS: Bring snacks! 🍿" If unknown, return empty "" without explanations.`;

export const getFunDesc = async ({ movieName, releaseDate, lang }) => {
  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `${initialPrompt} name: ${movieName}, release date: ${releaseDate}, language: ${lang}`
    });

    console.log(result.text);
    return result.text;
  } catch (error) {
    console.log("Error: ", error);
  }
};


