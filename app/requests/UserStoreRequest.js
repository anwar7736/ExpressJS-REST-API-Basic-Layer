const { userStoreSchema } = require('./schemas');

class UserStoreRequest {
  constructor(payload) {
    this.payload = payload;
  }

  validate() {
    const result = userStoreSchema.safeParse(this.payload);

    if (!result.success) {
      return {
        isValid: false,
        errors: result.error.issues.map((issue) => issue.message)
      };
    }

    return {
      isValid: true,
      data: result.data
    };
  }

  static from(payload) {
    return new UserStoreRequest(payload);
  }
}

module.exports = UserStoreRequest;
