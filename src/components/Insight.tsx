import { getTodayInsight } from "@/lib/Insight";

async function Insight(props: any) {
    let content = await getTodayInsight(props.section);
    if (!content)
        content = `Insight is not available for ${props.section}`;

    return (
        <>
        <div className="insight">
            <div className="title">
                Here is a TL;DR of today's news in {props.section} 
            </div>
            <div className="insight-content">
                            {content.split("\n").map((line, index) => (
                                <span key={index}>
                                    {line}
                                    <br />
                                </span>
                            ))}
            </div>
        </div>
        </>
    );
}

export default Insight;
