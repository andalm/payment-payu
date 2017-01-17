'use strict';

const PaymentStrategy = require('payment-strategy');
const http = require('./http');
const COMMANDS = {
  SUBMIT_TRANSACTION: 'SUBMIT_TRANSACTION',
  ORDER_DETAIL_BY_REFERENCE_CODE: 'ORDER_DETAIL_BY_REFERENCE_CODE',
  CREATE_TOKEN: 'CREATE_TOKEN',
  REMOVE_TOKEN: 'REMOVE_TOKEN'
};
const TRANSACTION_TYPES = {
  AUTHORIZATION_AND_CAPTURE: 'AUTHORIZATION_AND_CAPTURE',
  REFUND: 'REFUND'
};

let defaultConfig = {
  test: false,
  language: 'es',
  country: 'CO',
  hostname: 'api.payulatam.com',
  testHostname: 'sandbox.api.payulatam.com',
  paymentsPath: '/payments-api/4.0/service.cgi',
  reportsPath: '/reports-api/4.0/service.cgi',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=utf-8'
  }
};

module.exports = class PayU extends PaymentStrategy {
  constructor(config) {
    super('PayU');
    if (!config) { throw new Error('Config is required'); }
    if (!config.apiKey) { throw new Error('Config must have apiKey'); }
    if (!config.apiLogin) { throw new Error('Config must have apiLogin'); }
    if (!config.accountId) { throw new Error('Config must have accountId'); }
    if (!config.merchantId) { throw new Error('Config must have merchantId'); }

    defaultConfig = Object.assign(defaultConfig, config);
  }
}