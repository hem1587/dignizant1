const express = require("express");
const Form = require("../Models/Form");

const router = express.Router();

// Create form
router.post("/", async (req, res) => {
  try {
    const { title, description, questions } = req.body;

    // Create new form with title and description
    const newForm = new Form({
      title,
      description,
      fields: [],
      responses: []
    });

    // Save each question to the form
    for (const question of questions) {
      newForm.fields.push({
        title: question.title,
        description: question.description,
        questionText: question.questionText,
        options: question.options,
        optionType: question.optionType
      });
    }

    // Save the form to MongoDB
    await newForm.save();

    res.status(201).json(newForm);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
