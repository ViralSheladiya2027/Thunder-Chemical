import React from 'react';
import { Button, Container, Col, Row, Table} from 'react-bootstrap';
import { useCart } from 'react-use-cart';
import { db,storage } from "./Firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { BsCartCheck, BsCartX} from 'react-icons/bs';
import Swal from "sweetalert2"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState } from "react";

const Cart = ({ closeEvent }) => {
    
    const {
        isEmpty,
        items,
        cartTotal,
        updateItemQuantity,
        removeItem,
        emptyCart,
    } = useCart();

    const [image, setImage] = useState(null);

    const empCollectionRef = collection(db, "orders");
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
              addDoc(empCollectionRef,
            //      {
            //     image: downloadURL,
            //     name: name,
            //     price: Number(price),
            //     unit: unit,
            //   }
              );
              console.log("URL::" + downloadURL);
            });
          }
        );
    
        getUsers();
        closeEvent();
        Swal.fire("submitted", "your file has been submitted", "success");
      };
      const getUsers = async () => {
        const data = await getDocs(empCollectionRef);
        // setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
    return (
        <Container className="py-4 mt-5">
            <h1 className=' my-3 text-center'>
                {isEmpty? 'Your Cart is Empty' : 'The Cart'}
            </h1>
            <Row className="justify-content-center">
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
            </Row>
        </Container>
    );
};

export default Cart;