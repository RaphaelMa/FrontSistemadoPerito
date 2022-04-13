const CracoLessPlugin = require('craco-less');
const CracoAlias = require("craco-alias");
const reactHotReloadPlugin = require('craco-plugin-react-hot-reload')

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
            // link das vars disponíveis https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
            modifyVars: {
              '@primary-color': '#3CA49E',
              '@error-color': '#FF4D4F',
              '@highlight-color': '#FF4D4F',
            },
          },
        },
      },
    }, {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        baseUrl: "./src",
        tsConfigPath: "./tsconfig.extend.json",
      }
    },
    { plugin: reactHotReloadPlugin }
  ],
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  babel: {
    plugins: [
      ["babel-plugin-styled-components", { "displayName": true }],
      ['add-react-displayname']
    ]
  }
};
