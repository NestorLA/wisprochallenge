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
  users: [
    {
      "id": 1,
      "name": "Marty",
      "lastname": "McFly",
      "email": "martymcfly@april.biz",
      "dni": "35656989",
      "signupdate": "Mon May 10 2021 16:51:45",
      "adress": "Arkansas 1515"
    },
    {
      "id": 2,
      "name": "Biff",
      "lastname": "Tannen",
      "email": "bifftannen@april.biz",
      "dni": "38944419",
      "signupdate": "Mon May 3 2021 12:11:25",
      "adress": "Milwaukee 45"
    },
    {
      "id": 3,
      "name": "Emmet",
      "lastname": "Brown",
      "email": "emmet_brown@april.biz",
      "dni": "1547863",
      "signupdate": "Mon Mar 26 2021 16:51:45",
      "adress": "Riverside Drive 1640"
    },
    {
      "id": 4,
      "name": "Lorraine",
      "lastname": "Baines",
      "email": "lorrainecalvinklein@april.biz",
      "dni": "14577891",
      "signupdate": "Mon May 10 2021 09:12:18",
      "adress": "Lyon Drive 9303"
    },
    {
      "id": 5,
      "name": "George",
      "lastname": "Mcfly",
      "email": "georgevanhalen@april.biz",
      "dni": "13571891",
      "signupdate": "Mon May 3 2021 11:11:11",
      "adress": "Lyon Drive 3564"
    }
  ]
});

axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  const jwt = jwtDecode(localStorage.getItem('JWT'));

  if (!jwt.token) {
    // token does not exist return to home/login page
    console.log('token void')
  }

  const newConfig=  {...config, headers: { ...config.headers, 'Authorization': `Bearer ${jwt.token}` }};

  return newConfig
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});