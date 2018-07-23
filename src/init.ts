(global as any).WebSocket = require('ws');

(global as any).window = (global as any).window || {
  setTimeout,
  clearTimeout,
  WebSocket: (global as any).WebSocket,
  ArrayBuffer: global.ArrayBuffer,
  addEventListener: () => { },
  navigator: { onLine: true },
};

const LocalStorage = require('node-localstorage').LocalStorage;

const storage = new LocalStorage('./localstorage');

(global as any).localStorage = storage;
(window as any).localStorage = storage;

require('es6-promise').polyfill();
require('isomorphic-fetch');
