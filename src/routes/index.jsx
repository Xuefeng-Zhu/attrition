import React from 'react';
import PropTypes from 'prop-types';
import {
  connect
} from 'dva';
import { Select, Spin, Switch } from 'antd';

import styles from './index.less';

import Main from '../components/layout/main.jsx';
import Chart from '../components/visualization/chart'

const { Option } = Select;

function Index({
  location, dispatch, fields, rows, selectedfields, percent
}) {
  if (!fields) {
    return (<Spin />);
  }

  const options = fields.map(field => <Option key={field.index}>{field.name}</Option>);

  return (
    <Main location={location}>
      <div className={styles.container}>
        <Select
          className={styles.select}
          mode="multiple"
          placeholder="Please select"
          value={selectedfields.map(field => field.index.toString())}
          onChange={values => dispatch({ type: 'data/select', payload: { values } })}
        >
          {options}
        </Select>

        <Switch
          className={styles.switch}
          checked={percent}
          checkedChildren="percent"
          unCheckedChildren="count"
          onChange={percent => dispatch({ type: 'data/toggleMode', payload: { percent } })}
        />

        <div className={styles.chart}>
          <Chart
            rows={rows}
            selectedfields={selectedfields}
            percent={percent}
          />
        </div>
      </div>
    </Main>
  );
}

Index.propTypes = {
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  fields: PropTypes.array,
  rows: PropTypes.array,
  selectedfields: PropTypes.array,
  percent: PropTypes.bool
};

function mapStateToProps(state) {
  const { fields, rows, selectedfields, percent } = state.data;
  return {
    fields,
    rows,
    selectedfields,
    percent
  };
}

export default connect(mapStateToProps)(Index);
