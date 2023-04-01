export const environment = {
  production: false,
  localUrl: "https://localhost:44337/",
  prodUrl: "",

  getApiUrl(): string {
    if (window.location.href.indexOf('localhost') > -1) {
      return this.localUrl;
    } else {
      return this.prodUrl;
    }
  },
};