import { request } from 'umi';
import { values } from 'lodash';

export const getRemoteList = async params => {
  return request('http://public-api-v1.aspirantzhang.com/users', {
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
  return request(`http://public-api-v1.aspirantzhang.com/users/${id}`, {
    // api/users 跨域设置
    method: 'put',
    data: values,
  })
    .then(function(response) {
      console.log('成功0000==', response);
      return response.data;
    })
    .catch(function(error) {
      console.log('失败==', error);
    });
};
