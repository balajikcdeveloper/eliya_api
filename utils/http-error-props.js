const HttpError = {
  Unauthorized: {
    reasonPhrase: 'Not authorized to access this route',
    statusCode: '401',
  },
  BadRequest: {
    reasonPhrase: 'please add a name',
    statusCode: '400',
  },
};

module.exports = HttpError;
