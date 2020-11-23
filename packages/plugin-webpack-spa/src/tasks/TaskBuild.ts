import { output } from '@artemir/friendly-errors-webpack-plugin';
import { writeFileSync } from 'fs';
import webpack, { Compiler } from 'webpack';

import { Task } from '@zero-scripts/core';
import { WebpackConfig } from '@zero-scripts/webpack-config';

import { getStatsOptions } from '../utils/getStatsOptions';
import { WebpackSpaPluginOptions } from '../WebpackSpaPluginOptions';

type BuildTaskOptions = {
  json?: boolean | string;
};

export class TaskBuild extends Task {
  constructor(
    protected readonly configBuilder: WebpackConfig,
    protected readonly pluginOptionsContainer: WebpackSpaPluginOptions
  ) {
    super('build');
  }

  public run(args: string[], options: BuildTaskOptions): void | Promise<void> {
    process.env.NODE_ENV = 'production';

    const config = this.configBuilder.setIsDev(false).build();

    if (options.json) {
      config.stats = 'verbose';
    }

    const compiler = webpack(config);

    output.clearConsole();
    output.title('info', 'WAIT', 'Compiling...');

    compiler.run((err, stats) => {
      if (err) throw err;

      const getStatsOptionsFromCompiler = (compiler: Compiler) =>
        getStatsOptions(compiler.options ? compiler.options.stats : undefined);

      const foundStats = getStatsOptionsFromCompiler(compiler);

      if (options.json === true) {
        process.stdout.write(
          JSON.stringify(stats.toJson(foundStats), null, 2) + '\n'
        );
      }

      if (typeof options.json === 'string') {
        const JSONStats = JSON.stringify(stats.toJson(foundStats), null, 2);

        try {
          writeFileSync(options.json, JSONStats);

          console.log();
          output.info(
            `Stats are successfully stored as json to ${options.json}`
          );
        } catch (error) {
          console.log(error);

          process.exit(2);
        }
      }
    });
  }
}