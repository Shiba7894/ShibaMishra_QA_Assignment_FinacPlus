module.exports = {
  default: {
    require: [
      'src/steps/**/*.js'
    ],
    format: [
      'summary',
      'allure-cucumberjs/reporter'
    ],
    publishQuiet: true,
    formatOptions: {
      resultsDir: 'allure-results'
    },
    paths: [
      'src/features/**/*.feature'
    ],
    retry: 0
  }
};
