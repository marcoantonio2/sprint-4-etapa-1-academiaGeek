const { Router } = require("express");
const router = Router();
const fs = require("fs");
const contactsFile = fs.readFileSync("./contacts.json", "utf-8");
const contacts = JSON.parse(contactsFile);

router.get("/", (req, res) => {
  res.status(200).json("API test forntend");
});



module.exports = router;
