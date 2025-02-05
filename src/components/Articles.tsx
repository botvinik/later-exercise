import { findCurrentArticles } from "@/lib/Article";

async function Insight(props: any) {
    const articles = await findCurrentArticles(props.section);

    const renderArticles = () => {
        let elements = [];

        if (!articles || articles.length === 0) {
            return (
                <div className="article-none">No recent {props.section} news found</div>
            );
        }

        for (const article of articles) {
            elements.push(
                <>
                    <div key={article.uri} className="article">
                        <div className="article-title">{article.title}</div>
                        <div className="article-abstract">{article.abstract}</div>
                        <div className="article-link"><a href={article.url}>Read on NYT</a></div>
                    </div>
                </>
            );
        }
        return elements;
    }

    return (
        <>
        <div key="articles" className="articles">
            <div key="articles-title" className="title">
                Recent {props.section} news 
            </div>
            {renderArticles()}
        </div>
        </>
    );
}

export default Insight;