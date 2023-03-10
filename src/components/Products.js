import React ,{useState}from "react";
import { Card } from "react-bootstrap";
import { useCart } from "react-use-cart";
import { BsCartPlus } from "react-icons/bs";
import {
  Button,
  CardMedia,
  Stack,
  Typography,
  CardContent,
  Box,
  CardActionArea,
  CardActions,
  Rating,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const Products = (props) => {
  let { name, image, price, unit, description } = props.data;
  const [value, setValue] = useState(5);

  const { addItem } = useCart();
  const navigate = useNavigate();
  const addToCart = () => {
    addItem(props.data);
  };

  const buyNow = () => {
    // if(user){
    console.log(props.data);
    // }
    // else{
    navigate("/signup");
    // }
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
            <Card.Img variant="top" src={image} className="img-fluid" />
          </div>
        </div>
        <CardContent>
          <Typography variant="h6">{name}</Typography>
          <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
          <Typography variant="h4">
            {" "}
            <CurrencyRupeeIcon /> {price}
          </Typography>

          <Typography variant="body1">{unit}</Typography>

          <Typography variant="body1">{description}</Typography>

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
