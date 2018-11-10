const Joi = require("joi");

const movieValidationSchema = {
  title: Joi.string()
    .trim()
    .required(),
  releaseDate: Joi.date().required(),
  duration: Joi.number()
    .trim()
    .required(),
  actors: Joi.array()
    .items(Joi.string())
    .required()
};

module.exports.addMovie = {
  body: movieValidationSchema
};

module.exports.updateMovie = {
  body: movieValidationSchema,
  params: {
    id: Joi.string().required()
  }
};

module.exports.deleteMovie = {
  params: {
    id: Joi.string().required()
  }
};

module.exports.addReview = {
  body: {
    rating: Joi.number().required(),
    comment: Joi.string()
  },
  params: {
    id: Joi.string().required()
  }
};
