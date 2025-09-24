const mongoose = require("mongoose");

const courtSchema = new mongoose.Schema(
  {
    courtNo: {
      type: String,
      required: true,
      unique: true, // no duplicate court numbers
    },
    pricePerHour: {
      type: Number,
      required: true,
      default: 500,
    },
    fromHour: {
      type: String,
      required: true, // "08:00"
    },
    toHour: {
      type: String,
      required: true, // "22:00"
    },
    image: {
      type: String,
      required: true, // image URL
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Court", courtSchema);
