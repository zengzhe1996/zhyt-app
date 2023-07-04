import Taro from '@tarojs/taro';

const BASE_URL =
  process.env.NODE_ENV === 'development' ? '/dev-api' : '/prod-api';
const TIME_OUT = 20000;

const request = (url, method = 'GET', params, config) => {
  if (config.loading) {
    Taro.showLoading({
      title: 'Loading...',
      mask: true,
    });
  }
  return new Promise((resolve, reject) => {
    Taro.request({
      url: BASE_URL + url,
      method: method,
      timeout: TIME_OUT,
      data: params,
      header: {
        'content-type': 'application/json', // 默认值
      },
      mode: 'cors',
      success({ data }) {
        Taro.hideLoading();
        if (data.code === 200) {
          resolve(data.data);
        } else if (data.code === 401) {
          Taro.showToast({
            title: data.msg,
            icon: 'none',
            duration: 2000,
          });
        }
      },
      fail(err) {
        console.log(err);
        Taro.hideLoading();
        Taro.showToast({
          title: err.msg,
          icon: 'error',
          duration: 2000,
        });
        reject(err);
      },
    });
  });
};

const get = (url, params, config = { loading: true }) => {
  return request(url, 'GET', params, config);
};

const post = (url, params, config = { loading: true }) => {
  return this.request(url, 'POST', params, config);
};

export { request, get, post };
