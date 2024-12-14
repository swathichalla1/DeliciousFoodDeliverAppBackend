const itemController = require("../Controllers/ItemController")

const express = require("express")

const router = express.Router();

router.get('/getItems',itemController.getItems)
router.get('/getDetailedView/:id',itemController.getDetailedView)


module.exports = router;