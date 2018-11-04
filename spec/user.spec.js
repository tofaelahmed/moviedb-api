require("../bin/www");

const { User } = require("../models");
const userService = require("../services/user-service");
const user = {
  email: "tofael.raju@gmail.com",
  password: "123"
};

describe("user module:", () => {
  beforeAll(() => {
    return User.deleteMany({});
  });
  afterAll(() => {
    return User.deleteMany({});
  });
  describe("sign up: ", () => {
    it("should create a new user", () => {
      return userService.signUp(user.email, user.password).then(response => {
        expect(response.email).toBe("tofael.raju@gmail.com");
      });
    });
  });
});
