import { output } from '@artemir/friendly-errors-webpack-plugin';
import webpack from 'webpack';

import { AbstractTask } from '@zero-scripts/core';
import { WebpackConfig } from '@zero-scripts/webpack-config';

import { WebpackSpaPluginOptions } from '../WebpackSpaPluginOptions';

type WatchTaskOptions = {
  smokeTest?: boolean;
};

export class TaskWatch extends AbstractTask<'watch'> {
  constructor(
    protected readonly configBuilder: WebpackConfig,
    protected readonly pluginOptionsContainer: WebpackSpaPluginOptions
  ) {
    super('watch');
  }

  public async run(args: string[], options: WatchTaskOptions): Promise<void> {
    process.env.NODE_ENV = 'development';

    const config = await this.configBuilder.setIsDev(true).build();

    const compiler = webpack(config);

    if (options.smokeTest) {
      compiler.hooks.invalid.tap('WebpackSpaPlugin.smokeTest', () => {
        process.exit(1);
      });

      compiler.hooks.done.tap('WebpackSpaPlugin.smokeTest', () => {
        process.exit(1);
      });
    }

    output.clearConsole();
    output.title('info', 'WAIT', 'Compiling...');

    compiler.watch(
      {
        aggregateTimeout: 300,
        poll: undefined
      },
      err => {
        if (err) throw err;
      }
    );
  }
}
