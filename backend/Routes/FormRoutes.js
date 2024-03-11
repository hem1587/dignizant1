const express = require("express");
const Form = require("../Models/Form");

const router = express.Router();

// Create form
router.post("/", async (req, res) => {
  try {
    const { title, description, fields } = req.body;
    const newForm = new Form({
      title,
      description,
      fields,
      responses: [],
    });
    await newForm.save();
    res.status(201).json(newForm);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Get all forms
router.get("/", async (req, res) => {
  try {
    const forms = await Form.find();
    res.json(forms);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Get form by ID
router.get("/:formId", async (req, res) => {
  try {
    const formId = req.params.formId;
    const form = await Form.findById(formId);

    if (!form) {
      return res.status(404).json({ msg: "Form not found" });
    }

    res.json(form);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Submit response to a form
router.post("/:formId/response", async (req, res) => {
  try {
    const formId = req.params.formId;
    const form = await Form.findById(formId);

    if (!form) {
      return res.status(404).json({ msg: "Form not found" });
    }

    const response = req.body;
    form.responses.push(response);
    await form.save();

    res.json(form);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
