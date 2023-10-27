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

const getAllPosts = async (endpoint) => {
  const allPosts = [];
  let currentOffset = 0;
  const _limit = 100;

  while (true) {
    const response = await client.get({
      endpoint,
      queries: { offset: currentOffset, limit: _limit },
    });
    // console.log("response", response);
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

module.exports = async () => {
  const news = await getAllPosts("news");
  // console.log("news", news);

  return {
    news,
  };
};
