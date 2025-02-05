import OpenAI from "openai";
import { NytSections } from "@/config/constants";

const openai = new OpenAI();

// Function to summarize multiple articles with OpenAI conversation API
export async function summarizeArticles(section: NytSections, articles: any): Promise<string | null> {
    let prompt = `Generate a summary of today's ${section} news headline provided below. Each news headline is provided on a separated line:\n`;

    for (const article of articles) {
        prompt += article.title + '\n';
    }
    
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a helpful assistant that help summarizing news headlines. You must only use the news headlines provided by the user to generate the summary." },
                {
                    role: "user",
                    content: prompt
                }
            ],
            store: true,
        });
        return completion.choices.length >= 0 ? completion.choices[0].message.content : null;
    } catch (error) {
        console.log(`Error while querying OpenAI: ${error}`)
        return null;
    }
}
