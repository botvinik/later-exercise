import { fetchTopStories } from "@/lib/NytApi";
import { NytSections, SYNC_SECTIONS } from "@/config/constants";
import { storeArticles, findCurrentArticles } from "@/lib/Article";
import { storeInsight  } from "@/lib/Insight";
import { getTodayAtMidnight } from "@/lib/DateUtils";
import postgres_client from "@/lib/PostgresClient";
import { summarizeArticles } from "@/lib/OpenAI";
import * as dotenv from 'dotenv';

async function main() {
    // The .env file is not loaded outside of Next.js when running 'npm run fetch-nyt-stories', so we 
    // load the .env manually
    if (process.env.APP_NAME === undefined) {
        dotenv.config();
    }
    
    // The NYT 'topstories/v2/xxx.json' API actually returns articles from various sections (mostly from the requested section but
    // with some additional sections) so we first sync all sections to get all new articles before generating the OpenAI insigth 
    // in a second loop
    for (const section of SYNC_SECTIONS) {
        console.log(`Syncing section ${section}...`);
        const fetch_data = await fetchTopStories(section)
        if (fetch_data.status === "OK")
            await storeArticles(fetch_data.articles);    
    }
    const today = getTodayAtMidnight();
    for (const section of SYNC_SECTIONS) {
        console.log(`Summarizing section ${section}...`);
        const articles = await findCurrentArticles(section);
        if (articles.length === 0)
            continue;
        const summary = await summarizeArticles(section, articles);
        if (summary)
            storeInsight(section, today, summary);    
    }
    console.log("Done!");
    await postgres_client.$disconnect();
}

main().catch((error) => {
    console.error('Error while fetching articles from NYT:', error);
    postgres_client.$disconnect();
  });