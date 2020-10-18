module.exports = {
  configureWebpack: (config) => {
    config.devtool = 'source-map';
    // config.resolve.symlinks = false;
  },
  chainWebpack: (config) => config.resolve.symlinks(false),
  // chainWebpack: config => {
  //   // GraphQL Loader
  //   config.module
  //     .rule("graphql")
  //     .test(/\.(graphql|gql)$/)
  //     .use("graphql-tag/loader")
  //     .loader("graphql-tag/loader")
  //     .end();
  // },
  transpileDependencies: ['vuetify'],
};
