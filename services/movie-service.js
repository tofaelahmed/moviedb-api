/**
 * movie service module
 * @module services/movie-service
 */

const ObjectId = require("mongoose").Types.ObjectId;
const { Movie } = require("../models");
const socketHandler = require("../socket/socket-handler");
const NotFoundError = require("../errors/not-found");
const ConflictError = require("../errors/conflict");
const uiErrors = require("../ui-errors");
const logger = require("../logger");

/**
 * get list of all movies
 */
module.exports.getMovies = userId => {
  return Movie.find();
};
/**
 * get details of a movie by its Id
 * @param movieId
 */
module.exports.getMovieById = movieId => {
  return Movie.findById(movieId);
};
/**
 * creates a new movie in the db
 *
 * @param title
 * @param releaseDate
 * @param duration
 * @param director
 * @param actors
 * @param userId
 */
module.exports.addMovie = (
  title,
  releaseDate,
  duration,
  director,
  actors,
  userId
) => {
  logger.debug(`movie-service: creating movie with title: ${title}`);
  const movie = new Movie({
    title,
    releaseDate,
    duration,
    director,
    actors,
    user: userId
  });

  return movie.save().then(newMovie => {
    socketHandler.notifyNewMoviewAdded(newMovie);
    return newMovie;
  });
};

/**
 * updates existing movie in the db
 *
 * @param id
 * @param releaseDate
 * @param duration
 * @param director
 * @param actors
 * @param userId
 */
module.exports.updateMovie = (
  id,
  title,
  releaseDate,
  duration,
  director,
  actors
) => {
  logger.debug(`movie-service: updating movie, movie id: ${id}`);

  return Movie.findOne({ _id: id })
    .then(movie => {
      if (!movie) {
        throw new NotFoundError(
          `Requested movie not found`,
          uiErrors.MOVIE_NOT_FOUND
        );
      }

      movie.title = title;
      movie.releaseDate = releaseDate;
      movie.duration = duration;
      movie.director = director;
      movie.actors = actors;

      return movie.save();
    })
    .then(updatedMovie => {
      socketHandler.notifyMovieUpdated(updatedMovie);
      return updatedMovie;
    });
};

/**
 * deletes a movie from db by id
 *
 * @param movieId
 */
module.exports.deleteMovie = movieId => {
  logger.debug(`movie-service: deleting movie, movie id: ${movieId}`);
  return Movie.remove({ _id: new ObjectId(movieId) }).then(movie => {
    socketHandler.notifyMovieDeleted(movieId);
    return movie;
  });
};

/**
 * creates a review for a movie,
 * checks if user already reviewd the movie
 *
 * @param rating
 * @param comment
 * @param movieId
 * @param userId
 */
module.exports.addReview = (rating, comment, movieId, userId) => {
  logger.debug(
    `movie-service: creating review, movie id: ${movieId} , user id: ${userId}`
  );
  return Movie.findOne({ "reviews.user": userId, _id: new ObjectId(movieId) })
    .then(movie => {
      if (movie) {
        logger.error(
          `movie-service: User ${userId} already reviewed the movie: ${movieId}`
        );

        throw new ConflictError(
          `User already reviewed the movie`,
          uiErrors.MOVIE_DUP_REVIEW
        );
      }
      return Movie.findOne({ _id: movieId });
    })
    .then(movie => {
      if (movie.reviews) {
        movie.reviews.push({
          user: userId,
          rating: rating,
          comment: comment
        });
      }
      return movie.save();
    })
    .then(updatedMovie => {
      socketHandler.notifyMovieUpdated(updatedMovie);
      return updatedMovie;
    });
};
