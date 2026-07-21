class ApiResource {
  static success(data, message = '', statusCode = 200) {
    return {
      success: true,
      data,
      ...(message ? { message } : {})
    };
  }

  static error(message, statusCode = 400, errors = null) {
    return {
      success: false,
      error: message,
      ...(errors ? { errors } : {})
    };
  }

  static validation(errors, message = 'The given data was invalid.') {
    return {
      success: false,
      message,
      errors
    };
  }
}

module.exports = ApiResource;
