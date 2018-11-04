require("../bin/www");
const mongoose = require("mongoose");

const { Movie } = require("../models");
const movieService = require("../services/movie-service");

const movie = {
  title: "the shawshank redemption",
  releaseDate: new Date("09/22/1994"),
  duration: 120,
  director: "Frank Darabont",
  actors: ["Tim Robbins", "Morgan Freeman"]
};

describe("movie module:", () => {
  beforeAll(() => {
    return Movie.deleteMany({});
  });
  afterAll(() => {
    return Movie.deleteMany({});
  });
  describe("add movie: ", () => {
    it("should create a new movie in db", () => {
      return movieService
        .addMovie(
          movie.title,
          movie.releaseDate,
          movie.duration,
          movie.director,
          movie.actors,
          new mongoose.mongo.ObjectId()
        )
        .then(response => {
          expect(response.title).toBe("the shawshank redemption");
        });
    });
  });
});
