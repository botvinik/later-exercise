-- CreateTable
CREATE TABLE "Article" (
    "id" SERIAL NOT NULL,
    "section" TEXT,
    "title" TEXT,
    "abstract" TEXT,
    "url" VARCHAR(1024) NOT NULL,
    "uri" VARCHAR(1024) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "receivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Insight" (
    "id" SERIAL NOT NULL,
    "section" TEXT,
    "content" TEXT,
    "insightDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Insight_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Article_uri_key" ON "Article"("uri");

-- CreateIndex
CREATE INDEX "Article_uri_idx" ON "Article"("uri");

-- CreateIndex
CREATE INDEX "Article_section_publishedAt_idx" ON "Article"("section", "publishedAt" DESC);

-- CreateIndex
CREATE INDEX "Insight_section_insightDate_idx" ON "Insight"("section", "insightDate" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "Insight_section_insightDate_key" ON "Insight"("section", "insightDate");
