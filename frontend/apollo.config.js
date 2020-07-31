// const path = require("path");

// Load .env files
// const { loadEnv } = require("vue-cli-plugin-apollo/utils/load-env");
// const env = loadEnv([path.resolve(__dirname, ".env"), path.resolve(__dirname, ".env.local")]);

module.exports = {
  client: {
    // service: env.VUE_APP_APOLLO_ENGINE_SERVICE,
    includes: ["src/**/*.{js,jsx,ts,tsx,vue,gql}"],
    // localSchemaFile: "./graphql.schema.json"
  },
  service: {
    //   name: env.VUE_APP_APOLLO_ENGINE_SERVICE,
    localSchemaFile: "./graphql.schema.json",
  },
  // engine: {
  //   endpoint: process.env.APOLLO_ENGINE_API_ENDPOINT,
  //   apiKey: env.VUE_APP_APOLLO_ENGINE_KEY
  // }
};
