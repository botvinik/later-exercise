#!/bin/sh

echo "Running database Prisma migrations on postgres..."
npx prisma migrate deploy

echo "Fetching NYT stories..."
npm run fetch-nyt-stories

echo "Starting Next.js..."
npm run dev -- -H 0.0.0.0