import Papa from 'papaparse';
import data from '../assets/data_23101701_attrition.csv';

export async function fetch() {
  return new Promise((resolve) => {
    Papa.parse(data, {
      download: true,
      complete: (data) => {
        resolve(data);
      }
    });
  });
}
