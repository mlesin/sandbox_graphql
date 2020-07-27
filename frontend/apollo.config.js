module.exports = {
  client: {
    service: {
      name: "sandbox_graphql",
      // URL to the GraphQL API
      url: "http://localhost:4000/"
    },
    // Files processed by the extension
    includes: ["src/**/*.vue", "src/**/*.ts"]
  }
};
