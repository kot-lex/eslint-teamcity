/**
 * @fileoverview TeamCity report formatter plugin for ESLint
 * @author Andre Ogle
 */

const utils = require('./utils');
const formatErrors = require('./formatters/errors');
const formatInspections = require('./formatters/inspections');

function getUserConfig(propNames) {
  // Attempt to load package.json from current directory
  const config = JSON.parse(utils.loadPackageJson())['eslint-teamcity'] || {};

  const reporter =
    propNames.reporter || config.reporter || process.env.ESLINT_TEAMCITY_REPORTER || 'errors';

  const reportName =
    propNames.reportName ||
    config['report-name'] ||
    process.env.ESLINT_TEAMCITY_REPORT_NAME ||
    'ESLint Violations';

  const errorCountName =
    propNames.errorCountName ||
    config['error-count-name'] ||
    process.env.ESLINT_TEAMCITY_ERROR_COUNT_NAME ||
    'ESLint Error Count';

  const warningCountName =
    propNames.warningCountName ||
    config['warning-count-name'] ||
    process.env.ESLINT_TEAMCITY_WARNING_COUNT_NAME ||
    'ESLint Warning Count';

  return {
    reporter,
    reportName: utils.escapeTeamCityString(reportName),
    errorCountName: utils.escapeTeamCityString(errorCountName),
    warningCountName: utils.escapeTeamCityString(warningCountName)
  };
}

function getTeamCityOutput(results, propNames) {
  const config = getUserConfig(propNames || {});

  if (process.env.ESLINT_TEAMCITY_DISPLAY_CONFIG) {
    console.info(`Running ESLint Teamcity with config: ${JSON.stringify(config)}`);
  }

  let outputMessages = [];
  switch (config.reporter.toLowerCase()) {
    case 'inspections': {
      outputMessages = formatInspections(results, config);
      break;
    }
    case 'errors':
    default: {
      outputMessages = formatErrors(results, config);
      break;
    }
  }

  return outputMessages.join('\n');
}

module.exports = getTeamCityOutput;
