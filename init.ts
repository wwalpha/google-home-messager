(global as any).WebSocket = require('ws');

(global as any).window = (global as any).window || {
  setTimeout,
  clearTimeout,
  WebSocket: (global as any).WebSocket,
  ArrayBuffer: global.ArrayBuffer,
  addEventListener: () => { },
  navigator: { onLine: true },
};

(global as any).localStorage = {
  store: {},
  getItem: (key: string) => {
    return this.store[key];
  },
  setItem: (key: string, value: any) => {
    this.store[key] = value;
  },
  removeItem: (key: string) => {
    delete this.store[key];
  },
};

require('es6-promise').polyfill();
require('isomorphic-fetch');
