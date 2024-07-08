// route.js
const express = require("express");
const multer = require("../middleware/multer-config");
const router = express.Router();

const stuffCtrl = require("../controllers/stuff");

router.get("/", stuffCtrl.getAllThing);
router.post("/", multer, stuffCtrl.createThing);
router.get("/:id", stuffCtrl.getOneThing);
router.put("/:id", stuffCtrl.modifyThing);
router.delete("/:id", stuffCtrl.deleteThing);

module.exports = router;
