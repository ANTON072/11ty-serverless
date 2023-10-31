# 11ty で Serverless をするサンプル

https://11ty-serverless.netlify.app/

11ty でも microCMS をプレビューをしたい。

[Serverless — Eleventy](https://www.11ty.dev/docs/plugins/serverless/)

## レンダリングモード

1. ビルドテンプレート（普通の JamStack）
2. オンデマンドビルダー（最初のリクエストでレンダリング。ビルドが重いとき）
3. ダイナミックテンプレート（リクエストごとにレンダリング）

2 と 3 はレンダリングに失敗してもデプロイに失敗することはなく、その分リストも高くなる。

## 使い方

### STEP 1: BundlerPlugin を追加

`.eleventy.js`

```js
const { EleventyServerlessBundlerPlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
    name: "possum", // The serverless function name from your permalink object
    functionsDir: "./netlify/functions/",
  });
};
```

Bundler プラグインを複数回追加することで、同時に複数の Eleventy Serverless レンダリングモードに対応できます。テンプレートは複数のモードでレンダリングできます！

個々のテンプレートごとにバンドルプラグインを設定する必要はありませんが、代わりにレンダリングモードごとに 1 つのプラグインを使いたいでしょう。

- SSR には一つのプラグインが必要（`onrequest` or `dynamic`）
- 遅延レンダリングには、別のプラグインが必要（`onfirstrequest` or `obd`）
