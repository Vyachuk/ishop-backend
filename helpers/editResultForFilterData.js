const editedResult = (data, array) => {
  const result = array.map((name) => {
    return {
      title: name,
      items: [...new Set(data.map((item) => item[name]))],
    };
  });

  return result;
};

module.exports = editedResult;
