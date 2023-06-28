const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  age: Number,
  owner: {
    name: String,
  },
});

const Contact = mongoose.model("contact", contactSchema);

module.exports = Contact;
