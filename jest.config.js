module.exports = {
  bail: false,
  moduleFileExtensions: ['js', 'svelte'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.svelte$': 'svelte-jester'
  },
  transformIgnorePatterns: ['node_modules/(?!(lodash-es)/)'],
  verbose: true
};
