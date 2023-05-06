import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { Button, CardContent, Rating, Stack, Typography } from "@mui/material";
import React from "react";
import { Card } from "react-bootstrap";
import { BsCartPlus } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Products = (props) => {
  let { name, image, price, unit, rating, description } = props.data;

  const { addItem } = useCart();
  const navigate = useNavigate();
  const addToCart = () => {
    addItem(props.data);
    toast.success("add to cart succesfully", {
      position: "top-center",
      theme: "colored",
    });
  };

  const buyNow = () => {
    addItem(props.data);
    navigate("/cart");
  };

  return (
    <>
      <Card
        style={{ width: "17rem", height: "auto" }}
        className=" text-center p-0 overflow-hidden shadow mx-auto mb-4"
      >
        <div
          style={{
            background: "white",
            height: "15rem",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "inherit",
          }}
        >
          <div style={{ maxHeight: "8rem", maxWidth: "7rem" }}>
            <Card.Img
              variant="top"
              height="280px"
              src={image}
              className="img-fluid"
            />
          </div>
        </div>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {name}
          </Typography>

          <Typography variant="h4" sx={{ color: "#b71c1c" }}>
            {" "}
            <CurrencyRupeeIcon sx={{ color: "#b71c1c" }} /> {price}
          </Typography>

          <Typography variant="body1">{unit}</Typography>

          <Typography variant="body1">{description}</Typography>
          <Typography variant="subtitle1" sx={{ color: "#607d8b" }}>
            <Rating name="read-only" size="small" value={rating} readOnly /> ({" "}
            {rating} review)
          </Typography>

          <Stack direction="column" spacing={1}>
            <Button
              variant="contained"
              style={{ background: "#263238" }}
              onClick={() => addToCart()}
              type="submit"
            >
              <BsCartPlus size="1.6rem" />
              Add to Cart
            </Button>

            <Button
              onClick={buyNow}
              variant="contained"
              style={{ background: "#263238" }}
            >
              Buy now
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

export default Products;
