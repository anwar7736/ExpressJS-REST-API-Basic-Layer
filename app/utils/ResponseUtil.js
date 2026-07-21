const ApiResource = require('@/resources/ApiResource');

class ResponseUtil {
  static success(res, data, statusCode = 200, message = '') {
    return res.status(statusCode).json(ApiResource.success(data, message));
  }

  static error(res, message, statusCode = 400, errors = null) {
    return res.status(statusCode).json(ApiResource.error(message, statusCode, errors));
  }

  static validation(res, errors, message = 'The given data was invalid.', statusCode = 422) {
    return res.status(statusCode).json(ApiResource.validation(errors, message));
  }
}

module.exports = ResponseUtil;
