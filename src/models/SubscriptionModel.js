const mongoose = require("mongoose");
const modelOptions = require("../utils/timeStamp");

const SubscriptionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    validity: {
      type: Number,
      required: true,
    },
    usersLimit: {
      type: Number,
      required: true,
    },
    projectsLimit: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  modelOptions
);

const Subscription = mongoose.model("Subscription", SubscriptionSchema);
module.exports = Subscription;
