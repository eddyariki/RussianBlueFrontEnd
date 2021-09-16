export const rakutenApi = "https://app.rakuten.co.jp";
export const rakutenApiAppID = "1072797534055389100";
export const rakutenItemSearchApiURL = `${rakutenApi}/services/api/IchibaItem/Search/20170706`;

export const mock = false;

export const djangoURL = "http://localhost";
export const djangoPort = 8000;
export const djangoApi = mock
  ? "http://localhost:4000"
  : `${djangoURL}:${djangoPort}`;
