import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import Swal from "sweetalert2";
import { db } from "./Firebase";

import AddIcon from "@mui/icons-material/Add";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, Stack, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useStore } from "../Store";

const Cart = ({user}) => {
  const {
    isEmpty,
    items,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
    totalItems,
  } = useCart();

  const [order, setOrder] = useState("");
  // const setRows = useStore((state) => state.setRows);
  const orderCollectionRef = collection(db,`user/userid/${user.id}/order`);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    // const orderCollectionRef = collection(db,"users",userId,"order")
    // const result = await getDocs(orderCollectionRef);
    // return result;
    const data = await getDocs(orderCollectionRef);
    setOrder(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const navigate = useNavigate();

  const userOrder = async () => {
    {
      items.map((item) => {
        // if (user) {
        addDoc(orderCollectionRef, {
         
          name: item.name,
          unit: item.unit,
          price: item.price,
          cartTotal: cartTotal,
          totalItems: totalItems,
          userid:user.uid
       });
      // }
      });
    }

    getOrders();
    Swal.fire("submitted", "your order has been submitted ", "success");
    navigate("/");
    emptyCart();
  };

  return (
    <>
      <h1 className=" my-5 text-center">
        {isEmpty ? "Your Cart is Empty" : "The Cart"}
      </h1>
      {!isEmpty && (
        <Stack spacing={1} direction="column">
          <h4 className="mx-2 text-right" position="fixed">
            Total Price: Rs.{cartTotal}
          </h4>
          <Button
            variant="contained"
            className="mx-2 text-center "
            style={{ background: "#263238", height: "35px", color: "white" }}
            onClick={userOrder}
          >
            {" "}
            Proceed to Buy your ({totalItems} items){" "}
          </Button>
        </Stack>
      )}
      <Box height={10} />
      {items.map((item, index) => {
        return (
          <Card
            sx={{
              display: "flex",
              width: "20rem",
              height: "auto",
              background: "#f5f5f5",
            }}
            key={index}
            className=" text-center p-0 overflow-hidden shadow mx-auto mb-4"
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Stack direction="row" spacing={2}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography
                    component="div"
                    variant="h6"
                    sx={{ fontWeight: "bold" }}
                  >
                    {item.name}
                  </Typography>
                  <Typography variant="h4">
                    <CurrencyRupeeIcon /> {item.price}
                  </Typography>
                  <Typography variant="body1">{item.unit}</Typography>
                  <Typography sx={{ width: "150px" }} variant="body1">
                    {item.description}
                  </Typography>
                </CardContent>
                <Box sx={{ maxHeight: "4rem", maxWidth: "5rem" }}>
                  <CardMedia
                    component="img"
                    src={item.image}
                    alt={item.title}
                  />
                </Box>
              </Stack>

              <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
                <Button variant="outlined" style={{ background: "#bdbdbd" }}>
                  <RemoveIcon
                    onClick={() =>
                      updateItemQuantity(item.id, item.quantity - 1)
                    }
                  />
                </Button>
                <Button variant="outlined" style={{ background: "#f5f5f5" }}>
                  {item.quantity}
                </Button>
                <Button variant="outlined" style={{ background: "#bdbdbd" }}>
                  <AddIcon
                    onClick={() =>
                      updateItemQuantity(item.id, item.quantity + 1)
                    }
                  />
                </Button>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
                <Button variant="outlined">
                  <DeleteIcon onClick={() => removeItem(item.id)} />
                  Delete
                </Button>
              </Box>
            </Box>
          </Card>
        );
      })}
    </>
  );
};

export default Cart;
