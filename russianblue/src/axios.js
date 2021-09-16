import { djangoApi, rakutenApi } from "./constants";
import axios from "axios";
export const djangoApiInstance = axios.create({
  baseURL: djangoApi,
  timeout: 20000,
  // headers: {'X-Custom-Header': 'foobar'}
});

export const rakutenApiInstance = axios.create({
  baseURL: rakutenApi,
  timeout: 2000,
});
