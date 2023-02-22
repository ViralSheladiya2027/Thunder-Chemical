import React from "react";
import { Button, Container, Col, Row, Table } from "react-bootstrap";
import { useCart } from "react-use-cart";
import { db, storage } from "./Firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { BsCartCheck, BsCartX } from "react-icons/bs";
import Swal from "sweetalert2";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState, useEffect } from "react";
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
 
  const userOrder = async (e) => {
    e.preventDefault();
    if (image === null) return;
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          addDoc(empCollectionRef, {
            image: downloadURL,
            name: name,
            price: Number(price),
            unit: unit,
          });
          console.log("URL::" + downloadURL);
        });
      }
    );

    getUsers();
      closeEvent();
    Swal.fire("submitted", "your order has been submitted", "success");
  };
  const getUsers = async () => {
    const data = await getDocs(empCollectionRef);
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
 
  return (
    <>
      {/* <Row className="justify-content-center">
                <Table responsive="sm" striped bordered hover  className="mb-5">
                    <tbody>
                        {items.map((item, index)=>{
                            return(
                                <tr key={index}>
                                    <td>
                                        <div style={{ background: 'white', height: '8rem', overflow: 'hidden', display: 'flex',
                                        justifyContent: 'center', alignItems: 'center' }}>
                                            <div style={{ padding: '.5rem'}}>
                                                <img src={item.image} style={{ width: '4rem'}} alt={item.title} />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <h6 style={{ whiteSpace: 'nowrap', width: '14rem', overflow: 'hidden', textOverFlow: 'ellipsis'}}>
                                            {item.title}
                                        </h6>
                                    </td>
                                    <td>Rs. {item.price}</td>
                                    <td>Quantity ({item.quantity})</td>
                                    <td>
                                        <Button onClick={()=> updateItemQuantity(item.id, item.quantity - 1)} className="ms-2">-</Button>
                                        <Button onClick={()=> updateItemQuantity(item.id, item.quantity + 1)} className="ms-2">+</Button>
                                        <Button variant="danger" onClick={()=> removeItem(item.id)} className="ms-2">Remove Item</Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                {!isEmpty &&
                    <Row 
                        style={{ position: 'fixed', bottom: 0}}
                        className=' justify-content-center w-100'
                    >
                        <Col className="py-2">
                            <h4>Total Price: Rs. {cartTotal}</h4>
                        </Col>
                        <Col className="p-0" md={4}>
                            <Button variant="danger"
                                className="m-2"
                                onClick={()=> emptyCart()}
                            >
                                <BsCartX size="1.7rem" />
                                Clear Cart
                            </Button>
                            <Button variant="success"
                                className="m-3"
                                onClick={userOrder}
                            >
                                <BsCartCheck size="1.7rem" />
                                Submit
                            </Button>
                        </Col>
                    </Row>}
            </Row> */}
      <h1 className=" my-4 text-center">
        {isEmpty ? "Your Cart is Empty" : "The Cart"}
      </h1>
      {!isEmpty && (
        <Box component="main" sx={{ flexgrow: 1, p: 3, width: "100%" }}>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 500 }}>
              <Box height={10} />
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" style={{ minWidth: "100px" }}>
                      Name
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: "100px" }}>
                      Image
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: "100px" }}>
                      Price
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: "100px" }}>
                      unit
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: "100px" }}>
                      Quantity
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: "100px" }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          key={row.id}
                          role="checkbox"
                          tabIndex={-1}
                        >
                          <TableCell align="left">{row.name}</TableCell>
                          <TableCell align="left">
                            <img
                              width="40px"
                              height="35px"
                              src={row.image}
                              alt=""
                            />
                          </TableCell>
                          <TableCell align="left">{row.price}</TableCell>
                          <TableCell align="left">{row.unit}</TableCell>
                          <TableCell align="left">{row.quantity}</TableCell>
                          <TableCell align="left">
                            <Stack spacing={2} direction="row">
                              <RemoveIcon
                                style={{
                                  fontSize: "20px",
                                  color: "blue",
                                  cursor: "pointer",
                                }}
                                className="cursor-pointer"
                                onClick={() =>
                                  updateItemQuantity(row.id, row.quantity - 1)
                                }
                              />
                              <AddIcon
                                style={{
                                  fontSize: "20px",
                                  color: "darkred",
                                  cursor: "pointer",
                                }}
                                onClick={() =>
                                  updateItemQuantity(row.id, row.quantity + 1)
                                }
                              />
                              <DeleteIcon
                                style={{
                                  fontSize: "20px",
                                  color: "darkred",
                                  cursor: "pointer",
                                }}
                                onClick={() => removeItem(row.id)}
                              />
                            </Stack>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <Row
              style={{ position: "fixed", bottom: 0 }}
              className=" justify-content-center w-100"
            >
              <Col className="py-2">
                <h4>Total Price: Rs. {cartTotal}</h4>
              </Col>
              <Col className="p-0" md={4}>
                <Button
                  variant="danger"
                  className="m-2"
                  onClick={() => emptyCart()}
                >
                  <BsCartX size="1.7rem" />
                  Clear Cart
                </Button>
                <Button variant="success" className="m-3" onClick={userOrder}>
                  <BsCartCheck size="1.7rem" />
                  Submit
                </Button>
              </Col>
            </Row>
          </Paper>
        </Box>
      )}
    </>
  );
};

export default Cart;
