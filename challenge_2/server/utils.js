module.exports.generateCSV = (data) => {
  const csv = '';
  const headers = [];

  const keys = Object.keys(JSON.parse(data));
  for (let i = 0; i < keys.length; i++) {
    if (keys[i] !== 'children') {
      headers.push(keys[i]);
    }
  }
  console.log('headers', headers);

  return csv;
};
