require("dotenv").config();

const { createClient } = require("microcms-js-sdk");

const MICRO_CMS_API_KEY = process.env.MICRO_CMS_API_KEY;
const MICRO_CMS_DOMAIN = process.env.MICRO_CMS_DOMAIN;

if (!MICRO_CMS_API_KEY || !MICRO_CMS_DOMAIN) {
  throw new Error("環境変数が設定されていません");
}

const client = createClient({
  serviceDomain: MICRO_CMS_DOMAIN,
  apiKey: MICRO_CMS_API_KEY,
});

const getAllPosts = async ({ api, draftKey }) => {
  const allPosts = [];
  let currentOffset = 0;
  const _limit = 100;

  while (true) {
    const response = await client.get({
      endpoint: api,
      queries: { offset: currentOffset, limit: _limit, draftKey },
    });

    const { totalCount, contents, offset, limit } = response;
    allPosts.push(...contents);

    if (offset + limit >= totalCount) {
      break;
    }

    currentOffset = offset + limit;
  }

  const sorted = allPosts.sort((a, b) => {
    return a.createdAt > b.createdAt ? -1 : 1;
  });

  return sorted;
};

module.exports = async ({ eleventy }) => {
  const isServerless = eleventy.env.isServerless;
  const draftKey = isServerless
    ? eleventy.serverless?.query?.draftKey
    : undefined;

  const news = await getAllPosts({
    api: "news",
    draftKey,
  });
  return {
    news,
  };
};
