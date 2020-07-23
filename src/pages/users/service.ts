import { request } from 'umi';

export const getRemoteList = async params => {
    const data = [
        {
          key: '1',
          name: '张三丰',
          age: 32,
          address: '住址为山东',
          tags: ['nice', 'developer'],
        }
    ]

    return request('http://public-api-v1.aspirantzhang.com/users', { // api/users 跨域设置
        method: 'get',
      })
        .then(function(response) {
          console.log('成功==',response);
          return response.data
        })
        .catch(function(error) {
          console.log('失败==',error);
        });

}
