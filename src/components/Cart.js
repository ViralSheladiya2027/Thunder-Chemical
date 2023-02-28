import React from "react";
import { Button, Container, Col, Row, Table } from "react-bootstrap";
import { useCart } from "react-use-cart";
import { db, storage } from "./Firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { BsCartCheck, BsCartX } from "react-icons/bs";
import Swal from "sweetalert2";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState, useEffect } from "react";
// import { Card } from "react-bootstrap";
import {
  // Button,
  Alert,
  Autocomplete,
  Box,
  Divider,
  Paper,
  Snackbar,
  SnackbarContent,
  Stack,
  TableBody,
  TableCell,
  TablePagination,
  Typography,
} from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useStore } from "../Store";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const Cart = ({ closeEvent }) => {
  const {
    isEmpty,
    items,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();

  const setRows = useStore((state) => state.setRows);
  const empCollectionRef = collection(db, "orders");

  useEffect(() => {
    getUsers();
  }, []);

  // const userOrder = async (e) => {
  //   e.preventDefault();
  //   if (image === null) return;
  //   const storageRef = ref(storage, `images/${image.name}`);
  //   const uploadTask = uploadBytesResumable(storageRef, image);
  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       const progress = Math.round(
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //       );
  //     },
  //     (error) => {
  //       alert(error);
  //     },
  //     () => {
  //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //         addDoc(empCollectionRef, {
  //           image: downloadURL,
  //           name: name,
  //           price: Number(price),
  //           unit: unit,
  //         });
  //         console.log("URL::" + downloadURL);
  //       });
  //     }
  //   );

  //   getUsers();
  //     closeEvent();
  //   Swal.fire("submitted", "your order has been submitted", "success");
  // };
  const getUsers = async () => {
    const data = await getDocs(empCollectionRef);
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  return (
    <>
      <h1 className=" my-4 text-center">
        {isEmpty ? "Your Cart is Empty" : "The Cart"}
      </h1>
      {!isEmpty && (
        <Stack spacing={1} direction="column">
          <h4 className="mx-2 text-right" position="fixed">
            Total Price: Rs.{cartTotal}
          </h4>
          <SnackbarContent
            className="mx-2 text-center "
            // sx={{ Width: "100%" }}
            message="Proceed to Buy your item"
          />
        </Stack>
      )}
      <Box height={10} />
      {items.map((item, index) => {
        return (
          <Card
            sx={{ display: "flex", width: "20rem", height: "auto" }}
            key={index}
            className=" text-center p-0 overflow-hidden shadow mx-auto mb-4"
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Stack direction="row" spacing={2}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h6">
                    {item.name}
                  </Typography>
                  <Typography variant="h4" >
                    <CurrencyRupeeIcon /> {item.price}
                  </Typography>
                  <Typography  variant="body1">
                    {item.unit}
                  </Typography>
                  <Typography variant="body1">
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
                <Button variant="outlined">
                  <RemoveIcon
                    onClick={() =>
                      updateItemQuantity(item.id, item.quantity - 1)
                    }
                  />
                </Button>
                <Button variant="outlined">{item.quantity}</Button>
                <Button variant="outlined">
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
