const getPrimativeProperties = obj => {
  const result = {};
  for (let i in obj) {
    if (typeof obj[i] !== 'object') {
      result[i] = obj[i]
    }
  }
  return result;
};

module.exports = getPrimativeProperties;