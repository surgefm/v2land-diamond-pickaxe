import { HotModuleReplacementPlugin, WatchIgnorePlugin } from 'webpack';
import nodeExternals from 'webpack-node-externals';
import StartServerPlugin from 'start-server-webpack-plugin';

export default function(options) {
  return {
    ...options,
    entry: ['webpack/hot/poll?100', options.entry],
    watch: true,
    externals: [
      nodeExternals({
        whitelist: ['webpack/hot/poll?100'],
      }),
    ],
    plugins: [
      ...options.plugins,
      new HotModuleReplacementPlugin(),
      new WatchIgnorePlugin([/\.js$/, /\.d\.ts$/]),
      new StartServerPlugin({ name: options.output.filename }),
    ],
  };
}
