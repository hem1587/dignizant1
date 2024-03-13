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
router.delete("/questions/:questionId", async (req, res) => {
  const { formId, questionId } = req.params;

  try {
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    
    form.fields.pull({ _id: questionId });
    await form.save();

    res.json({ message: "Question deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});
router.get("/length", async (req, res) => {
  try {
    const formCount = await Form.countDocuments();
    res.json({ count: formCount });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});
router.get("/forms", async (req, res) => {
  try {
    const forms = await Form.find();
    res.json(forms);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
