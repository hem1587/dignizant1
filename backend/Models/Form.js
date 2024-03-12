const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  questionText: { type: String, required: true },
  options: [{ type: String }],
  optionType: { type: String }
});

const formSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  fields: [questionSchema],
  responses: [{ type: mongoose.Schema.Types.Mixed }]
});

const Form = mongoose.model("Form", formSchema);

module.exports = Form;