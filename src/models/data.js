import { fetch } from '../services/data';


export default {

  namespace: 'data',

  state: {
    percent: true,
    selectedfields: []
  },

  subscriptions: {
    setup({ dispatch }) {  // eslint-disable-line
      dispatch({ type: 'fetch' });
    }
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      const { data } = yield call(fetch);
      let [fields, ...rows] = data;

      rows = rows.filter(row => row.length > 1);
      fields = fields.map((name, index) => {
        const isNumber = Number.isInteger(parseInt(rows[0][index], 10));

        return {
          name,
          index,
          isNumber
        };
      });

      yield put({ type: 'updateState', payload: { fields, rows } });
    },

    *select({ payload }, { put }) {
      yield put({ type: 'selectFields', payload });
    },

    *toggleMode({ payload }, { put }) {
      yield put({ type: 'updateState', payload });
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },

    selectFields(state, { payload }) {
      const { values } = payload;
      const { fields, rows } = state;

      const selectedfields = values.map((index) => {
        const field = fields[index];

        if (field.isNumber && !field.max) {
          field.max = Math.max(...rows.map(row => row[field.index]));

          const step = field.max / 10;
          const size = 10 ** (step.toString().length - 1);
          field.step = Math.round(step / size) * size;
        }

        return field;
      });
      return { ...state, selectedfields };
    }
  }
};
