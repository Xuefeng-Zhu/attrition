import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function calculateBucket({ step }, number) {
  const bucket = parseInt(parseInt(number, 10) / step, 10);
  return `${(bucket - 1) * step}~${bucket * step}`;
}

function getChartData(rows, selectedfields) {
  const data = {};

  rows.forEach((row) => {
    const name = selectedfields.map((field) => {
      if (field.isNumber) {
        return calculateBucket(field, row[field.index]);
      }

      return row[field.index];
    }).join('/');

    if (!data[name]) {
      data[name] = {
        name,
        yes: 0,
        no: 0
      };
    };

    if (row[1] === 'Yes') {
      data[name].yes += 1;
    } else {
      data[name].no += 1;
    }
  });

  return Object.values(data);
}

function calculatePercent(data) {
  data.forEach((row) => {
    row.attrition = Math.round((row.yes / (row.yes + row.no)) * 100);
  });
}

function Chart({
  rows, selectedfields, percent
}) {
  if (!selectedfields.length) {
    return (
      <Alert message="Please select attribute you want to research" type="info" />
    );
  }

  const data = getChartData(rows, selectedfields);
  data.sort((a, b) => a.name > b.name);
  if (percent) {
    calculatePercent(data);
  }

  console.log(data)
  return (
    <BarChart
      width={700}
      height={700}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      {percent && <Bar dataKey="attrition" fill="#8884d8" unit="%" />}
      {!percent && <Bar dataKey="yes" fill="#8884d8" />}
      {!percent && <Bar dataKey="no" fill="#82ca9d" />}
    </BarChart>
  );
}

Chart.propTypes = {
  rows: PropTypes.array.isRequired,
  selectedfields: PropTypes.array.isRequired,
  percent: PropTypes.bool.isRequired
};

export default Chart;
