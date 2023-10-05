import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { loadStripe } from "@stripe/stripe-js";
import { orderApi } from "../servise/Api";
import "../styles/MenuItem.css";
import { ToastContainer } from "react-toastify";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};
const MenuItem = ({ name: pname, image, price }) => {
  const [open, setOpen] = useState(false);
  const [quan, setQuan] = useState(1);
  const [cname, setCname] = useState("");
  const [Number, setNumber] = useState("");
  const [Address, setAddress] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSub = (e) => {
    e.preventDefault();
    setQuan(quan - 1);
  };
  const handleAdd = (e) => {
    e.preventDefault();
    setQuan(quan + 1);
  };
  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51Nuv1iSBY6r63VDOzPKlBSY13lalmSoPVX7fHjkliAdSqpd0TGL80svjTc8m2Xs9x23B3onsww0MwLMMTW2uIvdW00haxiFAPk"
    );
    const orderData = {
      pname,
      quan,
      tpayment: quan * price,
      price,
      cname,
      Number,
      Address,
    };
    console.log(orderData);
    const order = await orderApi(orderData);
    if (order.status === 200) {
      console.log("your order is confirmed ");
    } else {
      console.log("your order is not confirmed");
    }

    const response = await fetch(
      "http://localhost:5000/api/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      }
    );
    const session = await response.json();
    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      console.log(result.error);
    }
  };

  return (
    <>
      <div className="menuItem">
        <div style={{ backgroundImage: `url(${image})` }}> </div>
        <h1> {pname} </h1>
        <div id="parallel">
          <p> ${price} </p>
          <Button
            variant="contained"
            onClick={handleOpen}
            style={{ fontSize: "14px" }}
          >
            Order Now
          </Button>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{
              textAlign: "center",
              marginBottom: "15px",
              color: "#1976d2",
              fontSize: "50px",
              marginTop: "-30px",
            }}
          >
            Order Details
          </Typography>
          <div style={{ display: "inline-block" }}>
            <TextField
              required
              onChange={(e) => setCname(e.target.value)}
              value={cname}
              label="Name"
            />
            <TextField
              onChange={(e) => setNumber(e.target.value)}
              style={{ marginLeft: "50px" }}
              required
              value={Number}
              label="Number"
            />
          </div>
          <TextField
            onChange={(e) => setAddress(e.target.value)}
            style={{ marginTop: "20px", width: "495px" }}
            required
            value={Address}
            label="Address"
          />
          <div style={{ display: "inline-flex" }}>
            <Button
              style={{
                marginTop: "40px",
                marginRight: "-37px",
                height: "50px",
                marginLeft: "-15px",
              }}
              onClick={handleSub}
            >
              <RemoveCircleOutlineIcon className="icon" />
            </Button>
            <Box
              component="form"
              sx={{
                "& > :not(style)": {
                  m: 1,
                  width: "50px",
                  textAlign: "center",
                },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField id="outlined-basic" variant="outlined" value={quan}>
                {quan}
              </TextField>
            </Box>
            <Button
              style={{
                marginTop: "40px",
                marginLeft: "-36px",
                height: "50px",
              }}
              onClick={handleAdd}
            >
              <AddCircleOutlineIcon />
            </Button>
            <h3
              style={{
                fontSize: "30px",
                marginTop: "45px",
                fontWeight: "100",
                marginLeft: "87px",
                width: "140px",
                color: "#1976d2",
              }}
            >
              Total Price
            </h3>
            <TextField
              id="outlined-basic"
              variant="outlined"
              value={`$  ${quan * price}`}
              style={{
                fontSize: "30px",
                marginTop: "35px",
                width: "100px",
              }}
            >
              ${price}
            </TextField>
          </div>
          <div>
            <button className="btn1" onClick={makePayment}>
              Pay Now
            </button>

            <button className="btn2" onClick={handleClose}>
              Cancel
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
};
export default MenuItem;
