const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  releaseDate: { type: Date, required: true },
  duration: { type: String, required: true },
  director: { type: String, required: true },
  actors: { type: [String], required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  reviews: {
    type: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
          required: true
        },
        rating: {
          type: Number,
          min: [1, "Rating should be atleast 1"],
          max: [5, "Rating should not be more then 5"],
          required: true
        },
        comment: { type: String },
        date: { type: Date, default: Date.now }
      }
    ]
  },
  createdAt: { type: Date, default: Date.now }
});

MovieSchema.virtual("avg_rating").get(function() {
  if (this.reviews.length === 0) return 0;
  const sum = this.reviews.reduce((sum, review) => sum + review.rating, 0);
  return sum / this.reviews.length;
});

MovieSchema.set("toObject", { virtuals: true });
MovieSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("movie", MovieSchema);
