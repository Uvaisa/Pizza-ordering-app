const express = require("express");
const router = new express.Router();
const contactController = require("../controller/contactController");
const controller = require("../controller/userController");
const orderController = require("../controller/orderController");
router.post("/user/register", controller.userregister);
router.post("/user/sendotp", controller.userOtpSend);
router.post("/user/login", controller.userLogin);

// contact details routes
router.post("/user/contact", contactController.contactdetails);
router.post("/user/order", orderController.orderdetails);
module.exports = router;
