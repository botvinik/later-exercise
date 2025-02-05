export const NYT_API_BASE = "https://api.nytimes.com/svc/topstories/v2/";

export enum NytSections {
    arts = 'arts',
    business = 'business',
    home = 'home',
    politics = 'politics',
    realestate = 'realestate',
    science = 'science',
    technology = 'technology',
    us = 'us',
    world = 'world'
}

export const SYNC_SECTIONS = [NytSections.business, NytSections.science, NytSections.technology, NytSections.us, NytSections.world];
export const DEFAULT_SECTION = NytSections.technology;
