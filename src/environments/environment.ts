export const environment = {
  production: false,
  localUrl: 'https://localhost:44337/',
  prodUrl: '',

  getEmailPattern(): string {
    return "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$";
  },

  getGeoRefApiURL(): string {
    return "https://apis.datos.gob.ar/georef/api";
  },


  getApiUrl(): string {
    if (window.location.href.indexOf('localhost') > -1) {
      return this.localUrl;
    } else {
      return this.prodUrl;
    }
  },
};
