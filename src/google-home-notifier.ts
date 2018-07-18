let Client = require('castv2-client').Client;
let DefaultMediaReceiver = require('castv2-client').DefaultMediaReceiver;
let mdns = require('mdns');
let browser = mdns.createBrowser(mdns.tcp('googlecast'));
let deviceAddress: string;
let language: string;
let deviceName: string;

let device = (name: string, lang: string = 'en') => {
  deviceName = name;
  language = lang;
  return this;
};

const ip = (ip: string) => {
  deviceAddress = ip;
  return this;
};

let googletts = require('google-tts-api');
let googlettsaccent = 'us';
let accent = (accent: string) => {
  googlettsaccent = accent;
  return this;
};

let notify = (message: string, callback: any) => {
  if (!deviceAddress) {
    browser.start();
    browser.on('serviceUp', (service: any) => {
      console.log('Device "%s" at %s:%d', service.name, service.addresses[0], service.port);
      if (service.name.includes(deviceName.replace(' ', '-'))) {
        deviceAddress = service.addresses[0];
        getSpeechUrl(message, deviceAddress, (res: any) => {
          callback(res);
        });
      }
      browser.stop();
    });
  } else {
    getSpeechUrl(message, deviceAddress, (res: any) => {
      callback(res);
    });
  }
};

let play = (mp3Url: string, callback: any) => {
  if (!deviceAddress) {
    browser.start();
    browser.on('serviceUp', (service: any) => {
      console.log('Device "%s" at %s:%d', service.name, service.addresses[0], service.port);
      if (service.name.includes(deviceName.replace(' ', '-'))) {
        deviceAddress = service.addresses[0];
        getPlayUrl(mp3Url, deviceAddress, (res: any) => {
          callback(res);
        });
      }
      browser.stop();
    });
  } else {
    getPlayUrl(mp3Url, deviceAddress, (res: any) => {
      callback(res);
    });
  }
};

let getSpeechUrl = (text: string, host: string, callback: any) => {
  googletts(text, language, 1).then((url: string) => {
    onDeviceUp(host, url, (res: any) => {
      callback(res);
    });
  }).catch((err: any) => {
    console.error(err.stack);
  });
};

let getPlayUrl = (url: string, host: string, callback: any) => {
  onDeviceUp(host, url, (res: any) => {
    callback(res);
  });
};

let onDeviceUp = (host: string, url: string, callback: any) => {
  const client = new Client();
  client.connect(host, () => {
    client.launch(DefaultMediaReceiver, (err: any, player: any) => {

      const media = {
        contentId: url,
        contentType: 'audio/mp3',
        streamType: 'BUFFERED', // or LIVE
      };
      player.load(media, { autoplay: true }, (err: any, status: any) => {
        client.close();
        callback('Device notified');
      });
    });
  });

  client.on('error', (err: any) => {
    console.log('Error: %s', err.message);
    client.close();
    callback('error');
  });
};

exports.ip = ip;
exports.device = device;
exports.accent = accent;
exports.notify = notify;
exports.play = play;
