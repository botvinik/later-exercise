import { NytSections } from "@/config/constants";
import postgres_client from "@/lib/PostgresClient";
import { getTodayAtMidnight } from "./DateUtils";

// Store a summary per day/section. We use an upsert with a combined unique key on [section, insightDate] as
// daily summary may change with the publication of new articles or updates on previous articles.
export async function storeInsight(section: NytSections, insightDate: Date, insight: string): Promise<boolean> {
    try {
        await postgres_client.Insight.upsert({
            where: { section_insight_date: {
                        section: section,
                        insightDate: insightDate 
                        }
                    },
            create: {
                content: insight,
                section: section,
                insightDate: insightDate
            },
            update: {
                content: insight
            }
        });
    } catch (error) {
        console.error(`Error storing insight: ${error}`);
        return false;
    }
    return true;
}

// Returns today's insight for a given section.
export async function getTodayInsight(section: NytSections): Promise<string | null> {
    try {
        const insight = await postgres_client.Insight.findFirst({
            where: {
                AND: [
                { 
                    section: {
                        equals: section
                    }
                },
                {
                    insightDate: {
                        equals: getTodayAtMidnight()
                    }
                },
            ]
            }
        });

       if (insight)
        return insight.content;
       else
        return null;
    } catch (error) {
        console.error(`Error retrieving insight: ${error}`);
        return null;
    }
}
