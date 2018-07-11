import * as googlehome from 'google-home-notifier';

export const ip = (ip: string, language: string) => googlehome.ip(ip, language);

export const play = (url: string) => googlehome.play(url, (res: any) => {
  console.log(res);
});
