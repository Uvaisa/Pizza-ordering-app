const contact = require("../models/contactSchema");
exports.contactdetails = async (req, resp) => {
  const { cname, email, message } = req.body;
  if (!cname || !email || !message) {
    resp.status(400).json({ error: "all fields are require" });
  }
  try {
    const contactdetails = await contact({
      cname,
      email,
      message,
    });
    const data = await contactdetails.save();
    resp.status(200).json(data);
  } catch (error) {
    resp.status(400).json({ error: "invalid details", error });
  }
};
