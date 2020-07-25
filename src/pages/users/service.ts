// import { request } from 'umi';
import request, { extend } from 'umi-request';
import { message } from 'antd';

// https://github.com/umijs/umi-request
const errorHandler = function(error) {
  const codeMap = {
    '021': 'An error has occurred',
    '022': 'It’s a big mistake,',
    // ....
  };
  if (error.response) {
    if (error.response.status > 400) {
      message.error(error.data.message);
    }
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.status);
    console.log(error.response.headers);
    console.log(error.data);
    console.log(error.request);
    console.log(codeMap[error.data.status]);
  } else {
    message.error('网络错误!');

    // The request was made but no response was received or error occurs when setting up the request.
    console.log(error.message);
  }

  throw error; // If throw. The error will continue to be thrown.

  // return {some: 'data'}; If return, return the value as a return. If you don't write it is equivalent to return undefined, you can judge whether the response has a value when processing the result.
  // return {some: 'data'};
};

const extendRequest = extend({ errorHandler });

export const getRemoteList = async params => {
  return extendRequest('http://public-api-v1.aspirantzhang.com/users', {
    // api/users 跨域设置
    method: 'get',
  })
    .then(function(response) {
      console.log('成功==', response);
      return response.data;
    })
    .catch(function(error) {
      console.log('失败==', error);
    });
};

export const editRecord = async ({ id, values }) => {
  return extendRequest(`http://public-api-v1.aspirantzhang.com/users/${id}`, {
    // api/users 跨域设置
    method: 'put',
    data: values,
  })
    .then(res => {
      message.success('编辑成功');
      console.log('编辑成功', res.data);
      // return res.data;
      return true;
    })
    .catch(err => {
      console.log('失败==', err);
      message.error('编辑失败');
      return false;
    });
};
export const addRecord = async ({ values }) => {
  // 将request换成extendRequest
  return extendRequest(`http://public-api-v1.aspirantzhang.com/users/`, {
    // api/users 跨域设置
    method: 'post',
    data: values,
  })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log('失败==', err);
      message.error('编辑失败');
      return false;
    });
};
// 删除
export const deleteRecord = async ({ id }) => {
  return extendRequest(`http://public-api-v1.aspirantzhang.com/users/${id}`, {
    method: 'delete',
  })
    .then(res => {
      message.success('删除成功');
      console.log(res.data);
      return true;
    })
    .catch(res => {
      console.log(err);
      message.error('删除失败');
      return false;
    });
};
