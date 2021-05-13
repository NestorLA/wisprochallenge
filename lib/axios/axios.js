import Axios from "axios";
import Mockadapter from "axios-mock-adapter";

// jwt decode
import jwtDecode from "jwt-decode";

// axios
export const axios = Axios.create({ baseURL: '/api/v1' });

// mock adapter
const mock = new Mockadapter(axios);

mock.onPost("/api/v1/login").reply(200, {
  jwt:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJhZG1pbkBleGFtcGxlLmNvbSIsInBhc3N3b3JkIjoiMTIzNDU2IiwidG9rZW4iOiJGQUtFX1RPS0VOIiwiaWQiOjEsImlhdCI6MTUxNjIzOTAyMn0.vIi54xwb_T4P9qQPXpREfWBM3DJ-ssOIbtfHemRH3MQ",
});

mock.onGet("/api/v1/users").reply(200, {
  data: ['leo', 'nestor']
});

axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  const jwt = jwtDecode(localStorage.getItem('JWT'));
  console.log('\n ~ jwt', jwt)

  if (!jwt.token) {
    // token does not exist return to home/login page
    console.log('token void')
  }

  const newConfig=  {...config, headers: { ...config.headers, 'Authorization': `Bearer ${jwt.token}` }};
  console.log('\n ~ newConfig', newConfig)

  return newConfig
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});