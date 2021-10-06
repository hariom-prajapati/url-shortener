const mongoose = require("mongoose");

const URLsSchema = new mongoose.Schema(
  {
    fullURL: {
      type: String,
      maxlength: 500,
      required: true
    },
    shortURL: {
      type: String,
      required: true,
    },
    urlCode: {
      type: String,
      maxlength: 5,
      required: true,
      unique: true
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
);

module.exports = Tests = mongoose.model("URL", URLsSchema);
