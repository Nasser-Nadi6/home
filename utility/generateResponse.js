function generateResponse(statusCode, msg) {
  return {
    meta: {
      date: new Date().toISOString(),
    },
    data: {
      statusCode: statusCode,
      message: msg,
    },
  };
}

module.exports = {
  generateResponse,
};
