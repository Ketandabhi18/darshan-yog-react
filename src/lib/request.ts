import axios, { AxiosRequestConfig } from "axios";

const client = axios.create({
  baseURL: "http://digitalaryasamaj.ap-south-1.elasticbeanstalk.com/",
});

export const request = (options: AxiosRequestConfig) => {
  console.log(options, "options");
  const onSuccess = (response: { headers: any; data: any }) => {
    return response.data;
  };
  const onError = (error: {
    config: any;
    response: { status: any; data: any; headers: any };
    message: any;
  }) => {
    return Promise.reject(error.response || error.message);
  };
  return client(options).then(onSuccess).catch(onError);
};

export const requestWithHeaders = (options: AxiosRequestConfig) => {
  const onSuccess = (response: { headers: any; data: any }) => {
    return response;
  };
  const onError = (error: {
    config: any;
    response: { status: any; data: any; headers: any };
    message: any;
  }) => {
    return Promise.reject(error.response || error.message);
  };
  return client(options).then(onSuccess).catch(onError);
};
