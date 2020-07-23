import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import { type } from '../../../../umi-antd-pro/config/defaultSettings';
export interface UserModelState {
  name: string;
}
export interface UserModelType {
  namespace: 'servers';
  state: UserModelState;
  // 异步
  effects: {
    query: Effect;
  };
  // 同步
  reducers: {
    save: Reducer<UserModelState>;
    // 启用 immer 之后
    // save: ImmerReducer<UserModelState>;
  };
  subscriptions: { setup: Subscription };
}




const UserModel: UserModelType = {
  namespace: 'servers',
  state: {
    name: '',
  },
  // 异步
  effects: {
    *query({ payload }, { call, put }) { // action,effects
        // yield put()
        // 发请求
        const data = [
          {
            key: '1',
            name: '张三丰',
            age: 32,
            address: '住址为山东',
            tags: ['nice', 'developer'],
          }
        ]

        yield put({
            type: 'save',
            payload: data
        })
    },
  },
  // 同步
  reducers: {
    save(state, action) {// action => type payload
        // 发请求
        const dataSource = [
            {
              key: '1',
              name: '张三',
              age: 32,
              address: '地址和住址',
              tags: ['nice', 'developer'],
            },
            {
              key: '2',
              name: 'Jim Green',
              age: 42,
              address: 'London No. 1 Lake Park',
              tags: ['loser'],
            },
            {
              key: '3',
              name: 'Joe Black',
              age: 32,
              address: 'Sidney No. 1 Lake Park',
              tags: ['cool', 'teacher'],
            },
          ];
          // return { // 默认格式
          //   ...state,
          //   ...action.payload,
          // };
      return dataSource; // reducers同步提交
      // return action.payload; // effects异步提交
    },
    // 启用 immer 之后
    // save(state, action) {
    //   state.name = action.payload;
    // },
  },
  // 订阅
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/servers') {
          dispatch({
            // type: 'query',// 异步
            type: 'save', // 同步
            // payload:{} // 一般有这个
          })
        }
      });
    }
  }
};
export default UserModel;