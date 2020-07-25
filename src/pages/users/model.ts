import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import { getRemoteList, addRecord, editRecord, deleteRecord } from './service';
import { message } from 'antd';

export interface UserModelState {
  name: string;
}
export interface UserModelType {
  namespace: 'users';
  state: UserModelState;
  // 异步
  effects: {
    query: Effect;
    edit: Effect;
    delete: Effect;
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
  namespace: 'users',
  state: [],
  // 异步
  effects: {
    *query({ payload }, { call, put }) {
      // action,effects
      // yield put()
      // 发请求
      const data = yield call(getRemoteList); // yield 等待结果返回
      console.log('model=>data', data);
      if (data) {
        yield put({ type: 'save', payload: data });
      }
    },
    *edit({ payload: { id, values } }, { call, put }) {
      console.log('values', values);
      const data = yield call(editRecord, { id, values });
      if (data) {
        yield put({ type: 'query' }); // 刷新列表
        message.success('编辑成功==');
      } else {
        message.error('编辑失败==');
      }
    },
    *add({ payload: { values } }, { call, put }) {
      const data = yield call(addRecord, { values });
      if (data) {
        yield put({ type: 'query' });
      }
    },
    *delete({ payload: { id } }, { call, put }) {
      console.log('id', id);
      const data = yield call(deleteRecord, { id });
      if (data) {
        yield put({ type: 'query' });
      }
    },
  },
  // 同步
  reducers: {
    save(state, action) {
      // action => type payload
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
        if (pathname === '/users') {
          dispatch({
            type: 'query', // 异步
            // type: 'save', // 同步
            // payload:{} // 一般有这个
          });
        }
      });
    },
  },
};
export default UserModel;
