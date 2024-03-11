const mongoose = require("mongoose");
const connection = mongoose.connect("mongodb+srv://hemant1587:hemant1587@cluster0.75lusbn.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0");
module.exports = { connection };
