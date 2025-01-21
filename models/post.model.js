const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  author: { type: String, required: true },
});

postSchema.methods.toLocalString = function () {
  return this.created_at.toLocalString();
};

module.exports = mongoose.model("Post", postSchema);
