const home = require('google-home-pusher');
console.log(home);
home.ip('172.16.80.3');

home.notify('まみまいままま');

process.on('rejectionHandled', console.log);
