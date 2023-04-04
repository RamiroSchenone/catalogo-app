export const environment = {
  production: false,
  localUrl: 'https://localhost:44337/',
  prodUrl: '',

  getEmailPattern(): string {
    return "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$";
  },

  getApiUrl(): string {
    if (window.location.href.indexOf('localhost') > -1) {
      return this.localUrl;
    } else {
      return this.prodUrl;
    }
  },
};
