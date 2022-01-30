const express = require("express");
const { createTracing } = require("trace_events");
const { getItem, createItem,updateItem } = require("../controllers/productController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/item/:id").get(getItem);
router.route("/item/new").post(isAuthenticatedUser,createItem);
router.route("/item/:id").put(updateItem);

module.exports = router