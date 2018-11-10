const express = require("express");
const router = express.Router();
const passport = require("passport");
const validate = require("express-validation");

const movieService = require("../../services/movie-service");
const validation = require("../validation/movie");

const protectRoute = () => passport.authenticate("jwt", { session: false });

router.get("/", protectRoute(), (req, res, next) => {
  movieService
    .getMovies()
    .then(movies => {
      res.status(200).send(movies);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

router.get("/:id", protectRoute(), (req, res, next) => {
  const movieId = req.params.id;
  movieService
    .getMovieById(movieId)
    .then(movies => {
      res.status(200).send(movies);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

router.post(
  "/",
  protectRoute(),
  validate(validation.addMovie),
  (req, res, next) => {
    const { title, releaseDate, duration, director, actors } = req.body;
    const { _id: userId } = req.user;
    movieService
      .addMovie(title, releaseDate, duration, director, actors, userId)
      .then(movie => {
        res.status(201).send(movie);
      })
      .catch(error => {
        res.status(500).send(error);
      });
  }
);

router.delete(
  "/:id",
  protectRoute(),
  validate(validation.deleteMovie),
  (req, res, next) => {
    const movieId = req.params.id;
    movieService
      .deleteMovie(movieId)
      .then(() => {
        res.status(200).send(movieId);
      })
      .catch(error => {
        res.status(500).send(error);
      });
  }
);

router.put(
  "/:id",
  protectRoute(),
  validate(validation.updateMovie),
  (req, res, next) => {
    const { title, releaseDate, duration, director, actors } = req.body;
    const movieId = req.params.id;
    const userId = req.user._id;

    movieService
      .updateMovie(
        movieId,
        title,
        releaseDate,
        duration,
        director,
        actors,
        userId
      )
      .then(id => {
        res.status(201).send(id);
      })
      .catch(error => {
        res.status(500).send(error);
      });
  }
);

router.put(
  "/:id/reviews",
  protectRoute(),
  validate(validation.addReview),
  (req, res, next) => {
    const { rating, comment } = req.body;
    const movieId = req.params.id;
    const { _id: userId, email: userEmail } = req.user;

    movieService
      .addReview(rating, comment, movieId, userId, userEmail)
      .then(movie => {
        res.status(201).send(movie);
      })
      .catch(error => {
        res.status(500).send(error);
      });
  }
);
module.exports = router;
