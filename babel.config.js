module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        src: './src/',
        '@config': './src/config',
        '@models': './src/models',
        '@controllers': './src/controllers',
        '@views': './src/views',
        '@repository': './src/repositories',
        '@dtos': './src/dtos'
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
};
