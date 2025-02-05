import { fetchTopStories } from "@/lib/NytApi";
import { NytSections, SYNC_SECTIONS } from "@/config/constants";
import { storeArticles, findCurrentArticles, storeInsight } from "@/lib/Article";
import { getTodayInsight } from "@/lib/Insight";
import { getTodayAtMidnight } from "@/lib/DateUtils";
import postgres_client from "@/lib/PostgresClient";
import { summarizeArticles } from "@/lib/OpenAI";
import * as dotenv from 'dotenv';

async function main() {
    // The .env file is not loaded outside of next.js when running 'npm run fetch-nyt-stories', so we 
    // load the the env manually
    if (process.env.APP_NAME === undefined) {
        dotenv.config();
    }
    
    const insight = await getTodayInsight(NytSections.science);
    console.log(insight);

    await postgres_client.$disconnect();
}

main().catch((error) => {
    console.error('Error while fetching articles from NYT:', error);
    postgres_client.$disconnect();
  });