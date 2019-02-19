/**
 * @author    : Adarsh Pastakia
 * @version   : 1.0.0
 * @copyright : 2018
 * @license   : MIT
 */
const express = require("express");
const countries = require("./countries.json");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json(countries);
});

router.get("/list/:id", (req, res) => {
  const {id} = req.params;
  const filtered = countries.map(c => c.continent === id);
  res.status(200).json(filtered);
});

router.get("/:id", (req, res) => {
  const {id} = req.params;
  const country = countries.find(c => c.iso2 === id || c.iso3 === id);
  if(country) {
    res.status(200).json(country);
  } else {
    res.status(400).text(`Country [${id}] not found`);
  }
});

module.exports = router;
