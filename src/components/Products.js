import React from "react";
import { Card } from "react-bootstrap";
import { useCart } from "react-use-cart";
import { BsCartPlus } from "react-icons/bs";

const Products = (props) => {
  let { name, image, price, unit ,description} = props.data;

  const { addItem } = useCart();

  const addToCart = () => {
    addItem(props.data);
  };
  return (
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
        <div style={{ maxHeight: "6rem", maxWidth: "7rem" }}>
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
          Rs. <span className="h4">{price}</span>
        </Card.Title>
        <Card.Title>
          <span className="h4">{unit}</span>
        </Card.Title>
         <Card.Title>
          <span className="h4">{description}</span>
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
