const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  fields: [{ type: String, required: true }],
  responses: [{ type: mongoose.Schema.Types.Mixed }],
});

const Form = mongoose.model("Form", formSchema);

module.exports = Form;
