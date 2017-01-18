const https = require('https');

module.exports = class API {
  constructor(config) {
    this._config = config;
  }

  request(data, cb) {
    let req = https.request(this._generateOptions(data));
    req.on('response', res => {
      let response = '';
      res.setEncoding('utf8');
      res.on('data', chunk => {
        response += chunk;
      });

      res.on('end', () => {
        return cb(null, {
          statusCode: res.statusCode,
          body: response
        });
      });
    });

    req.on('error', function (e) {
      cb(e);
    });

    req.end();
  }

  _generateOptions(data) {
    let path = data.path;
    let method = data.method;
    data = this._dataTransform(data);
    this._config.headers['Content-Length'] = data.length;

    return {
      hostname: this._config.test ? this._config.testHostname : this._config.hostname,
      path: path,
      method: method,
      data: (typeof data !== 'string') ? JSON.stringify(data) : data,
      headers: this._config.headers || {}
    };
  }

  _dataTransform(data) {
    let defaultPayload = {
      test: this._config.test,
      language: this._config.language,
      merchant: {
        apiLogin: this._config.apiLogin,
        apiKey: this._config.apiKey
      }
    };
    delete data.path;
    delete data.method;

    return Object.assign(data || {}, defaultPayload);
  }
};