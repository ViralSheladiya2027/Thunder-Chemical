import React from "react";
import { Card } from "react-bootstrap";
import { useCart } from "react-use-cart";
import { BsCartPlus } from "react-icons/bs";
import { db, storage } from "./Firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

const Products = (props) => {
  let { name, image, price, unit } = props.data;

  const { addItem } = useCart();
  const empCollectionRef = collection(db, "products");

  useEffect(() => {
    getUsers();
  }, []);

  
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
    const getUsers = async () => {
    const data = await getDocs(empCollectionRef);
   
  };

  const addToCart = () => {
    addItem(props.data);
  };
  return (
    <Card
      style={{ width: "18rem", height: "auto" }}
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
        <div style={{ width: "9rem" }}>
          <Card.Img variant="top" src={image} className="img-fluid" />
        </div>
      </div>
      <Card.Body>
        <Card.Title
          style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </Card.Title>
        <Card.Title>
          Rs. <span className="h3">{price}</span>
        </Card.Title>
        <Card.Title>
          <span className="h3">{unit}</span>
        </Card.Title>
        <span
          onClick={() => addToCart()}
          type="submit"
          className="d-flex align-item-center m-auto border-0 "
        >
          <BsCartPlus size="1.8rem" />
        </span>
      </Card.Body>
    </Card>
  );
};

export default Products;
