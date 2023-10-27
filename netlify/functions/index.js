const { EleventyServerless } = require("@11ty/eleventy");

async function handler(event) {
  let elev = new EleventyServerless("serverless", {
    path: event.path,
    query: event.queryStringParameters,
  });

  try {
    // URLにマッチする11tyのテンプレートのHTMLを返す
    // eleventyConfig.dataFilterSelectorsと一緒に使うことでカスケードデータをpage.dataに入れることができる
    let [page] = await elev.getOutput();
    let html = page.content;

    return {
      statusCode: 200,
      body: html,
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message }),
    };
  }
}

exports.handler = handler;
