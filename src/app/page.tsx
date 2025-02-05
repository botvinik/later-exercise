import Image from "next/image";
import { usePathname, useSearchParams } from 'next/navigation'
import Header from "@/components/Header";
import Insight from "@/components/Insight";
import Articles from "@/components/Articles";

import { DEFAULT_SECTION } from "@/config/constants";

export default function Home({params, searchParams}) {
  const section = searchParams.section || DEFAULT_SECTION;
  return (
    <>
      <Header section={section}/>
      <Insight section={section}/>
      <Articles section={section}/>
    </>
  );
}
