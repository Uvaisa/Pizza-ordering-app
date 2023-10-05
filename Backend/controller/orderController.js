const Order = require("../models/order");
exports.orderdetails = async (req, resp) => {
  const { pname, quan, tpayment, price, cname, Number, Address } = req.body;
  try {
    const orderdetails = await Order({
      pname,
      quan,
      tpayment,
      price,
      cname,
      Number,
      Address,
    });
    const data = await orderdetails.save();
    resp.status(200).json(data);
  } catch (error) {
    resp.status(400).json({ error: "invalid details", error });
  }
};
