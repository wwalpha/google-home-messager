(global as any).WebSocket = require('ws');

(global as any).window = (global as any).window || {
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  WebSocket: (global as any).WebSocket,
  ArrayBuffer: global.ArrayBuffer,
  addEventListener: function () { },
  navigator: { onLine: true }
};

(global as any).localStorage = {
  store: {},
  getItem: function (key: string) {
    return this.store[key]
  },
  setItem: function (key: string, value: any) {
    this.store[key] = value
  },
  removeItem: function (key: string) {
    delete this.store[key]
  }
};

require('es6-promise').polyfill();
require('isomorphic-fetch');
