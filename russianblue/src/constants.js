export const rakutenApi = "https://app.rakuten.co.jp";
export const rakutenApiAppID = "1072797534055389100";
export const rakutenItemSearchApiURL = `${rakutenApi}/services/api/IchibaItem/Search/20170706`;

export const mock = false;
export const dev = false;

export const djangoURL = "http://localhost";
export const djangoPort = 8000;

let djangoApi_;
if (dev) {
  djangoApi_ = mock ? "http://localhost:4000" : `${djangoURL}:${djangoPort}`;
} else {
  djangoApi_ = "https://russianblue-hackathon.herokuapp.com";
}

export const djangoApi = djangoApi_;

export const siteURL = "https://russianblue.netlify.app";
