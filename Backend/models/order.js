const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  pname: {
    required: true,
    type: String,
  },
  quan: {
    required: true,
    type: String,
  },
  tpayment: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: String,
  },
  cname: {
    required: true,
    type: String,
  },
  Number: {
    required: true,
    type: String,
  },
  Address: {
    required: true,
    type: String,
  },
});
const Order = new mongoose.model("OrderDetails", orderSchema);
module.exports = Order;
