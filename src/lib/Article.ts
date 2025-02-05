import { NytSections } from "@/config/constants";
import postgres_client from "@/lib/PostgresClient";
import { getTodayAtMidnight, getTomorrowAtMidnight } from "./DateUtils";

// Articles received by the NYT API can be updated over the time. We use the article's URI as unique key 
// identifier to upsert the articles.
export async function storeArticles(articles: any): Promise<any> {
    const status = { total: articles.length, success: 0, error: 0 }

    for (const article of articles) {
      try {
        await postgres_client.Article.upsert({
            where: { uri: article.uri },
            create: {
                section: article.section,
                title: article.title,
                abstract: article.abstract,
                url: article.url,
                uri: article.uri,
                publishedAt: new Date(article.published_date),
                createdAt: new Date(article.created_date),
                updatedAt: new Date(article.updated_date),
                receivedAt: new Date()
          },
          update: {
            title: article.title,
            abstract: article.abstract,
            url: article.url,
            updatedAt: new Date(article.updated_date),
            receivedAt: new Date()
          }
        });
        status.success += 1;
      } catch (error) {
        status.error += 1;
        console.error(`Error storing article: ${article.uri}: ${error}`);
      }
    }

    return status;
  }

  // Retrieve today's articles for a given section
  export async function findCurrentArticles(section: NytSections): Promise<any> {
    try {
        const articles = await postgres_client.Article.findMany({
            where: {
                AND: [
                { 
                    section: {
                        equals: section
                    }
                },
                {
                    receivedAt: {
                        gt: getTodayAtMidnight()
                    }
                },
                {
                    receivedAt: {
                        lt: getTomorrowAtMidnight()
                    }
                }
            ]
            }
        });

        return articles;
    } catch (error) {
        console.error(`Error retrieving articles: ${error}`);
        return []
    }
}
