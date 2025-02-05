"use client";
import { useRouter } from "next/navigation";
import { NytSections, SYNC_SECTIONS } from "@/config/constants";

function Header(props: any) {
    const router = useRouter();

    const handleChange = (event: any) => {
        const newValue = event.target.value;
        window.location.assign(`?section=${newValue}`);
      };

    const renderSections = () => {
        return (
            <>
            <span>Select a news category: </span>
            <select id="sections" value={props.section} onChange={handleChange}>
                {SYNC_SECTIONS.map((section) => (
                    <option key={section} value={section}>{section}</option>
                ))}
            </select>
            </>
        );
    }

    return (
        <>
        <div className="header">
            <div className="title">
                Later Exercise - New York Times Headlines
            </div>
            <div className="section-selector">
                {renderSections()}
            </div>
        </div>
        </>
    );
}

export default Header;
