const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
dotenv.config();
const mongoose = require("mongoose");
const router = require("./routes/routes");
const stripe = require("stripe")(
  "sk_test_51Nuv1iSBY6r63VDOahSs16FM5IL92IdeyJq0TaOTry7l1phhpe6C45apetP35ilrMleWbj5qMKROmhd2lOwTj9jM00qfZdewM3"
);
//middleware
app.use(express.json());
app.use(cors());

const Connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connect to mongo DB");
  } catch (error) {
    console.log(" can not connect to mongo DB");
  }
};

app.listen(process.env.PORT, () => {
  Connect();
  console.log("server is listing" + process.env.PORT);
});

//checkout api
app.post("/api/create-checkout-session", async (req, resp) => {
  const storeData = req.body;
  console.log(storeData);
  const lineItems = [
    {
      price_data: {
        currency: "usd",
        product_data: {
          name: storeData.pname,
        },
        unit_amount: storeData.price * 100,
      },
      quantity: storeData.quan,
    },
  ];

  console.log(lineItems);
  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/menu",
  });

  resp.json({ id: session.id });
});
app.use(router);
