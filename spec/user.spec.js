require("../bin/www");

const { User } = require("../models");
const userService = require("../services/user-service");
const user = {
  email: "tofael.raju@gmail.com",
  password: "123"
};

describe("user module:", () => {
  beforeAll(done => {
    return User.deleteMany({}, function(err) {
      if (err) exit(1);
      done();
    });
  });
  afterAll(done => {
    return User.deleteMany({}, function(err) {
      if (err) exit(1);
      done();
    });
  });
  describe("sign up: ", () => {
    it("should create a new user", () => {
      return userService.signUp(user.email, user.password).then(response => {
        expect(response.email).toBe("tofael.raju@gmail.com");
      });
    });
    it("should throw error when email exits", () => {
      return userService.signUp(user.email, user.password).catch(error => {
        expect(error.message).toBe(`email already exists`);
      });
    });
  });
});
