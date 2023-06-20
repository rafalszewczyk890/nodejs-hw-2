const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();
const uriDb = process.env.DB_HOST;

const connection = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection.then(() => {
  console.log("Connected to MongoDBs");
});

const dogs = [];

const Dog = mongoose.model("dogs", {
  name: {
    type: String,
    minLength: 2,
    maxLength: 20,
    required: [true, "Name is required"],
    index: 1,
  },
  age: {
    type: Number,
    min: 30,
    max: 700,
  },
  owner: {
    name: String,
    favorites: [String],
    birthday: Date,
    hasMoreDogs: Boolean,
  },
});

router.get("/", async (req, res, next) => {
  res.json(dogs);
});

router.get("/add", (req, res, next) => {
  const dog = new Dog({
    name: "Burek",
    age: 50,
    owner: {
      name: "Kasia",
    },
  });

  const result = dog.save().then((response) => {
    console.log("dog has been saved", response);
    res.json(response);
  });
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;

  const dog = dogs.filter((dog) => dog.id === id);
  res.status(200).json(dog);
});

module.exports = router;
