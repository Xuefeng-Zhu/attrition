import React from 'react';
import PropTypes from 'prop-types';
import {
  connect
} from 'dva';
import { Select, Spin } from 'antd';

import styles from './index.less';

import Main from '../components/layout/main.jsx';
import Chart from '../components/visualization/chart'

const { Option } = Select;

function Index({
  location, dispatch, fields, rows, selectedfields
}) {
  const options = fields.map(field => <Option key={field}>{field}</Option>);

  if (!fields) {
    return (<Spin />);
  }

  return (
    <Main location={location}>
      <div>
        <Select
          mode="multiple"
          className={styles.select}
          placeholder="Please select"
          defaultValue={[]}
          onChange={value => dispatch({ type: 'data/select', payload: { selectedfields: value } })}
        >
          {options}
        </Select>

        <Chart rows={rows} selectedfields={selectedfields}/>
      </div>
    </Main>
  );
}

Index.propTypes = {
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  fields: PropTypes.array,
  rows: PropTypes.array,
  selectedfields: PropTypes.array
};

function mapStateToProps(state) {
  const { fields, rows, selectedfields } = state.data;
  return {
    fields,
    rows,
    selectedfields
  };
}

export default connect(mapStateToProps)(Index);
