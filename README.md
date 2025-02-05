# Architectural Design
The file [Later - Architectural Design.pdf](Later%20-%20Architectural%20Design) contains the architectural design.

# POC - Application overview
The application fetches the top stories from the New York Times APIs from 5 categories (business, science, technology, us, world) and store them 
in a Postgres Database. After fetching the top stories the application generates a daily summary of the top stories for each category by querying 
OpenAI conversation API.
The application offers a simple UI (one page) that allows the user to choose the news category from a dropdown menu. The page displays the daily summary
and the list of related articles with:
* a title
* an abstract
* a link to the full article on NYT web site

# POC - Application architecture
## Overview
The application runs a Next.js server and a Posgresql DB within a Docker environment. The choice of running within Docker was motivated by:
* minimizing the effort for installing and running the application
* ensuring maximum compatibility with Later's engineering team develpment machines
* embedding a database without external configuration

Next.js uses Prisma as the ORM for the DB management and schema migration tools. The choice of Prisma was motivated by:
* it's ease of use
* support of Typescript
* great integration with Next.js

## Architectural decisions
The top stories fetching and summarization is decoupled and implemented as a backend job:
* the top stories update frequency is low
* summarizing and fetching is a relatively slow process 

For the purpose of this POC the sync job (`/src/jobs/FetchNytStories.ts`) runs when the Next.js container starts. In a real world implementation, 
the process would run as a scheduled job (an ECS task) on a separate service every few minutes.

The UI is mostly static, with only a dropdown to select the category, so we render it with SSR to allow better SEO and caching from CDNs.

# POC - Application setup
## Installation
1. Clone the repository
2. Make sure you have Docker installed on your machine
3. Make a `.env` file in the root folder with `touch .env`. Add the the following variables:
```
APP_NAME=later-exercise

# Database config
DATABASE_URL=postgresql://postgres:later2025!@later_db:5432/later_dev

# NYT config
NYT_API_KEY=ask_alan_hackett

# OpenAI config
OPENAI_API_KEY=ask_alan_hackett
```
**The NYT_API_KEY and OPENAI_API_KEY were provided to Alan Hackett. Please contact Alan Hackett and replace the above placeholders**

## Start the development server
1. Run `docker compose up -d client-dev` to start the development server
2. Open `http://localhost:3000` in your browser
3. By default, the technology category is displayed. You can pick another category from the dropdown to update the page with the relevant articles and summary.

When starting the containers the following steps are executed by `entrypoint.sh`:
1. The database migrations are applied if necessary
2. The NYT stories are synced and summarized with `npm run fetch-nyt-stories`
3. Next.js is started

## Exit the development server
Run `docker compose down` to stop the development server

## Manually run the NYT article sync job
When the containers are running, we can manually run the synchronization job with the command `npm run fetch-nyt-stories` within the `client-dev` container.
