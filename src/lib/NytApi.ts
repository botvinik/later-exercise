import axios from "axios";
import { NYT_API_BASE, NytSections } from "@/config/constants";


/* Retrieve articles from the NYT API and return a simple object:
    { "status": "OK | ERROR", "error": "", "articles": [] }

    The function handles API and connection errors but should implement retry with exponential backoff
    on HTTP 503, network connection.
*/
export async function fetchTopStories(section: NytSections) {
    try {
        const response = await axios.get(
          `${NYT_API_BASE}${section}.json?api-key=${process.env.NYT_API_KEY}`
        );
        const payload = response.data;
        if (payload && payload.status === "OK") {
            return {
                "status": "OK",
                "articles": payload.results
            };
        } else {
            const error_resp = {
                "status": payload ? payload["status"] : "ERROR", 
                "error": payload ? `API status: ${payload["status"]}` : "No payload received",
                "articles": []
            }
            console.error(error_resp);
            return error_resp;
        }
      } catch (error) {
        const error_resp = {
            "status": "ERROR", 
            "error": `Error fetching data from NYT API: ${error}`,
            "articles": []
        }
        console.error(error_resp);
        return error_resp;
      }
}
