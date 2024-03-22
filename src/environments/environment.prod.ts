const packageJson = require('../../package.json');

const HOST = 'https://ss88c712j0.execute-api.us-east-1.amazonaws.com/dev';

export const environment = {
  API_PUBLIC: HOST + '/',
  production: true,
  context: 'production',
  version: packageJson.version,
};
