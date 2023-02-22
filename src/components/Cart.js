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
  Autocomplete,
  Box,
  Divider,
  Paper,
  Stack,
  TableBody,
  TableCell,
  TablePagination,
  Typography,
} from "@mui/material";
import { TextField, TableContainer, TableHead, TableRow } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useStore } from "../Store";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';

const Cart = ({ closeEvent }) => {
  const {
    isEmpty,
    items,
    row,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();

  const [data, setData] = useState([])
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const rows = useStore((state) => state.rows);
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
    // <>
    //  <h1 className=" my-4 text-center">
    //     {isEmpty ? "Your Cart is Empty" : "The Cart"}
    //   </h1>
    //   <Row className="justify-content-center">
    //             <Table responsive="sm" striped bordered hover  className="mb-5">
    //                 <tbody>
    //                     {items.map((item, index)=>{
    //                         return(
    //                             // <tr key={index}>
    //                             //     <td>
    //                             //         <div style={{ background: 'white', height: '8rem', overflow: 'hidden', display: 'flex',
    //                             //         justifyContent: 'center', alignItems: 'center' }}>
    //                             //             <div style={{ padding: '.5rem'}}>
    //                             //                 <img src={item.image} style={{ width: '4rem'}} alt={item.title} />
    //                             //             </div>
    //                             //         </div>
    //                             //     </td>
    //                             //     <td>
    //                             //         <h6 style={{ whiteSpace: 'nowrap', width: '14rem', overflow: 'hidden', textOverFlow: 'ellipsis'}}>
    //                             //             {item.name}
    //                             //         </h6>
    //                             //     </td>
    //                             //     <td>Rs. {item.price}</td>
    //                             //     <td>Quantity ({item.quantity})</td>
    //                             //     <td>
    //                             //         <Button onClick={()=> updateItemQuantity(item.id, item.quantity - 1)} className="ms-2">-</Button>
    //                             //         <Button onClick={()=> updateItemQuantity(item.id, item.quantity + 1)} className="ms-2">+</Button>
    //                             //         <Button variant="danger" onClick={()=> removeItem(item.id)} className="ms-2">Remove Item</Button>
    //                             //     </td>
    //                             // </tr>
    //                             <Card
    //                             style={{ width: "18rem", height: "auto" }}
    //                             className=" text-center p-0 overflow-hidden shadow mx-auto mb-4"
    //                           >
    //                             <div
    //                               style={{
    //                                 background: "white",
    //                                 height: "15rem",
    //                                 overflow: "hidden",
    //                                 display: "flex",
    //                                 justifyContent: "center",
    //                                 alignItems: "center",
    //                                 marginBottom: "inherit",
    //                               }}
    //                             >
    //                               <div style={{ width: "9rem" }}>
    //                                 <Card.Img variant="top" src={item.image} className="img-fluid" />
    //                               </div>
    //                             </div>
    //                             <Card.Body>
    //                               <Card.Title
    //                                 style={{
    //                                   textOverflow: "ellipsis",
    //                                   overflow: "hidden",
    //                                   whiteSpace: "nowrap",
    //                                 }}
    //                               >
    //                                 {item.name}
    //                               </Card.Title>
    //                               <Card.Title>
    //                                 Rs. <span className="h3">{item.price}</span>
    //                               </Card.Title>
    //                               <Card.Title>
    //                                 <span className="h3">{item.unit}</span>
    //                               </Card.Title>
    //                               {/* <span
    //                                 onClick={() => addToCart()}
    //                                 type="submit"
    //                                 className="d-flex align-item-center m-auto border-0 "
    //                               >
    //                                 <BsCartPlus size="1.8rem" />
    //                               </span> */}
    //                             </Card.Body>
    //                           </Card>
    //                         )
    //                     })}
    //                      {!isEmpty &&
    //                 <Row 
    //                     style={{ position: 'fixed', bottom: 0}}
    //                     className=' justify-content-center w-100'
    //                 >
    //                     <Col className="py-2">
    //                         <h4>Total Price: Rs. {cartTotal}</h4>
    //                     </Col>
    //                     <Col className="p-0" md={4}>
    //                         <Button variant="danger"
    //                             className="m-2"
    //                             onClick={()=> emptyCart()}
    //                         >
    //                             <BsCartX size="1.7rem" />
    //                             Clear Cart
    //                         </Button>
    //                         <Button variant="success"
    //                             className="m-3"
    //                             // onClick={userOrder}
    //                         >
    //                             <BsCartCheck size="1.7rem" />
    //                             Submit
    //                         </Button>
    //                     </Col>
    //                 </Row>}
    //                 </tbody>
    //             </Table>
                
    //         </Row>
    
    // </>
    <Card sx={{ display: 'flex' }}>
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flex: '1 0 auto' }}>
        <Typography component="div" variant="h5">
          Live From Space
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          Mac Miller
        </Typography>
      </CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
        {/* <IconButton aria-label="previous">
          {direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
        </IconButton> */}
        <IconButton aria-label="play/pause">
          <PlayArrowIcon sx={{ height: 38, width: 38 }} />
        </IconButton>
        {/* <IconButton aria-label="next">
          {direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
        </IconButton> */}
      </Box>
    </Box>
    <CardMedia
      component="img"
      sx={{ width: 151 }}
      image="/static/images/cards/live-from-space.jpg"
      alt="Live from space album cover"
    />
  </Card>

  );
};

export default Cart;
