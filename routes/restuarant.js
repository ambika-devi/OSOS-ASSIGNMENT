const express = require("express");
const router = express.Router();


const restaurantController = require("../controllers/restuarantController");

router.get("/restaurants", restaurantController.getRestaurantsNearLocation);

module.exports = router;