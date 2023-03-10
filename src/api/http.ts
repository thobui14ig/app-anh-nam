import axios, { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';

import ApiConstant from './apiConstant';

class Http {
  instance: AxiosInstance;
  accessToken = localStorage.getItem('accessToken');
  refreshToken = localStorage.getItem('refreshToken');

  constructor() {
    this.instance = axios.create({
      baseURL: ApiConstant.BASE_API_URL,
      timeout: 10000,
      headers: {
        x_authorization: this.accessToken,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.accessToken,
      },
      data: {
        refreshToken: this.refreshToken,
      },
    });

    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 403) {
          toast.error(error?.response?.data?.message);
        } else if (error.response.status === 500) {
          // Handle internal server errors
        }
        return Promise.reject(error);
      },
    );
  }
}

const http = new Http().instance;
export default http;
