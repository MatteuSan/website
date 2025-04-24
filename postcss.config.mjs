export default {
  plugins: [
    // restore the Next.js default behavior
    "postcss-flexbugs-fixes",
    [
      "postcss-preset-env",
      {
        autoprefixer: {
          flexbox: "no-2009",
        },
        stage: 3,
        features: {
          "custom-properties": false,
        },
      },
    ],
    /*[
      // configure PurgeCSS
      "@fullhuman/postcss-purgecss",
      {
        content: ["*!/!**!/!*.{js,jsx,ts,tsx,mdx,md,html}"],
        defaultExtractor: (content) => content.match(/[.@]?[a-zA-Z0-9_-]+[:.][a-zA-Z0-9_-]+|[.@]?[a-zA-Z0-9_-]+/g) || [],
        safelist: {
          standard: ["html", "body"],
        },
      },
    ],*/
  ],
};