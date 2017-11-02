import { fetch } from '../services/data';


export default {

  namespace: 'data',

  state: {},

  subscriptions: {
    setup({ dispatch }) {  // eslint-disable-line
      dispatch({ type: 'data/fetch' });
    }
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      const { data } = yield call(fetch);
      const [fields, ...rows] = data;
      yield put({ type: 'save', payload: { fields, rows } });
    },

    *select({ payload }, { put }) {  // eslint-disable-line
      yield put({ type: 'save', payload });
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    }
  }

};
