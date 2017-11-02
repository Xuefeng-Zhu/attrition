import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'antd';

function Chart({
  rows, selectedfields
}) {
  if (!selectedfields || !selectedfields.length) {
    return (
      <Alert message="Please select attribute you want to research" type="info" />
    );
  }

  return (
    <div />
  );
}

Chart.propTypes = {
  rows: PropTypes.array,
  selectedfields: PropTypes.array
};

export default Chart;
