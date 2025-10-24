// webpack.config.js

const path = require('path'); // <--- IMPORT PATH MODULE

/**
 * This function is used by the Nest CLI to merge its default webpack config with your custom one.
 * @param {import('webpack').Configuration} options - The default NestJS webpack configuration.
 * @param {import('webpack')} webpack - The webpack instance.
 * @returns {import('webpack').Configuration} - The merged configuration.
 */
module.exports = (options, webpack) => {
  const lazyImports = [
    '@nestjs/microservices',
    '@nestjs/websockets',
    'cache-manager',
    'class-validator',
    'class-transformer',
  ];

  return {
    ...options,
    // Add this block to enable the ESM experiment
    experiments: {
      outputModule: true,
    },
    // This is the key part that fixes the issue
    output: {
      ...options.output,
      // Tells Webpack to generate ESM-compatible code
      library: {
        type: 'module',
      },
    },
    externals: [],
    plugins: [
      ...options.plugins,
      // THIS IS THE NEW PART
      new webpack.DefinePlugin({
        // Replace __dirname with the absolute path of the project directory
        __dirname: JSON.stringify(path.resolve()),
      }),
      new webpack.IgnorePlugin({
        checkResource(resource) {
          return lazyImports.includes(resource);
        },
      }),
    ],
  };
};
