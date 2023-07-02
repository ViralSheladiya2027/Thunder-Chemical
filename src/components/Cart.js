import AddIcon from "@mui/icons-material/Add";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, Stack, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { addDoc, collection, setDoc, doc } from "firebase/firestore";
import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import Swal from "sweetalert2";
import { db } from "./Firebase";

const Cart = ({ user }) => {
  const {
    isEmpty,
    items,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
    totalItems,
  } = useCart();

  

  const currentDate = new Date();
  // useEffect(() => {
  //   getOrders();
  // }, []);
  // const getOrders = async () => {
  //   const data = await getDocs(orderCollectionRef);
  //   setOrder(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  // };
  const navigate = useNavigate();

  const userOrder = async () => {
    if (!user) {
      console.log("no user");
      navigate("/signup");
    } else {
      
      const orderCollectionRef = collection(db, "orders");
      const orderDocRef = doc(orderCollectionRef, user.uid);

      return setDoc(orderDocRef, {
        cartTotal: cartTotal,
        items: items,
        totalItems: totalItems,
        status : "Active",
        userid: user.uid,
        date: currentDate,
      }).then(() => {
        Swal.fire(
          "submitted",
          "your order has been submitted... You will receive a confirmation call for your order within 1 to 3 days",
          "success"
        );
        navigate("/");
        emptyCart();
      });
    }
    // try {
    //   items.map( async (item) =>{
    //   // Create a new order document in the orders collection
    //   const orderDocRef = await addDoc(collection(db, 'orders'), {

    //              name: item.name,
    //       unit: item.unit,
    //       price: item.price,
    //     cartTotal: cartTotal,
    //     totalItems: totalItems,
    //     date: currentDate,

    //   });

    //    const uOrdersRef = doc(db, 'user', user.uid);

    //   await setDoc(uOrdersRef, {
    //     "ID":user.uid
    //   });

    //   const userOrdersRef = doc(db, 'user', user.uid, 'orders', orderDocRef.id);

    //   await setDoc(userOrdersRef, {
    //     items: items,
    //     cartTotal: cartTotal,
    //     totalItems: totalItems,
    //     date: currentDate,
    //   });

    //   console.log('Order saved successfully!');
    // });
    // } catch (error) {
    //   console.error('Error saving order:', error);
    // }

    // Swal.fire(
    //   "submitted",
    //   "your order has been submitted... You will receive a confirmation call for your order within 1 to 3 days",
    //   "success"
    // );
    // navigate("/");
    // emptyCart();
  };

  return (
    <>
      <h1 className=" my-5 text-center">
        {isEmpty ? "Your Cart is Empty" : ""}
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
            Proceed to Buy your ({totalItems}{" "}
            {totalItems === 1 ? "item" : "items"}){" "}
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
