
const path = require('path');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');

module.exports = (env, argv) => {
  const entry = "./src/index.ts";
  
  return {
    entry,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        }
      ]
    },
    externals: { 
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    output: {
      filename:  '[name].js', // [name] 占位符用来代替入口名称
      path: path.resolve(__dirname, `dist/`), // 使用环境变量来动态设置输出目录
      module: true,
      library: {
        type: "module"
      },
      globalObject: "window",
    },
    plugins: [
      new WebpackShellPluginNext({
        onBuildEnd: {
          scripts: ["dts-bundle-generator --no-check -o ./dist/index.d.ts ./src/index.ts"],
        }
      })
    ],
    experiments: {
      outputModule: true,
    },
    optimization: {
      usedExports: false,
    },
    devtool: false,
    // devtool : "source-map",
    // devtool: argv.mode === 'development' ? 'source-map' : false, // 'eval-source-map',
    // ...其余配置...
  }
};