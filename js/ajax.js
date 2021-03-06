﻿/**
 * @desc 简单的 AJAX 函数封装
 * @author _king
 * @param {String} url 请求路径
 * @param {Object} settings 参数配置
 */
const ajax = function(url, settings = {}) {
  // set default values
  const {
    method = 'GET',
    responseType = '',
    header = {},
    timeout = 0,
    data = null,
    isAsync = true
  } = settings;

  // get XMLHttpRequest object
  let getXhr = () =>
    new XMLHttpRequest() || new ActiveXObject('Microsoft.XMLHTTP');

  class DataFormater {
    constructor(data) {
      this._data = data;
    }

    // text fmt
    getText() {
      return this._data;
    }

    // json fmt
    getJson() {
      let __data =
        typeof this._data === 'object' ? this._data : JSON.parse(this._data);
      if (__data === null) return __data;
      return __data.d && __data.d !== '' ? JSON.parse(__data.d) : __data;
    }

    // other format methods here
  }

  return new Promise((resolve, reject) => {
    const xhr = getXhr();
    xhr.onreadystatechange = function() {
      if (this.readyState !== 4) return;
      this.status === 200
        ? resolve(new DataFormater(this.response))
        : reject(new Error(this.statusText));
    };
    xhr.timeout = timeout;
    xhr.responseType = responseType;

    // set request header
    for (let item in header) {
      xhr.setRequestHeader(item, header[item]);
    }

    xhr.open(method, url, isAsync);
    xhr.send(data);
  });
};

window.ajax = window.ajax || ajax;
