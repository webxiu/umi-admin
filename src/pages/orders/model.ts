import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import { type } from '../../../../umi-antd-pro/config/defaultSettings';
export interface UserModelState {
  name: string;
}
export interface UserModelType {
  namespace: 'orders';
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
  namespace: 'orders',
  state: {
    name: '',
  },
  // 异步
  effects: {
    *query({ payload }, { call, put }) { // action,effects
        // 发请求
        const data = [
            {
              key: '1',
              name: '张三丰o',
              age: 32,
              address: '住址==order',
              tags: ['nice', 'developer'],
            }]

            yield put({
                type: 'save', // 同步的方法名
                payload: data
            })
    },
  },
  // 同步
  reducers: {
    save(state, action) {// action => type payload
        // 发请求
        
        // return { // 默认格式
        //   ...state,
        //   ...action.payload,
        // };
      return action.payload; // effects异步提交
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
        if (pathname === '/orders') {
          dispatch({
            type: 'query',// 异步
            // type: 'save', // 同步
            // payload:{} // 一般有这个
          })
        }
      });
    }
  }
};
export default UserModel;