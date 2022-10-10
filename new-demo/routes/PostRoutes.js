const express = require("express");
const PostControllers = require("../controller/PostControllers");
const router = express.Router();

router
  .route("/")
  .get(postControllers.getAllData)
  .post(postControllers.insertNewData);
router.route("/:id").get(postControllers.getDatabyId);
