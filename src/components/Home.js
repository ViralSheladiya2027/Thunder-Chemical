import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import Products from "../components/Products";
import { db } from "./Firebase";
import SearchIcon from "@mui/icons-material/Search";
// import background from "../logo/background.png";

const Home = () => {
  const [searchProduct, setSearchProduct] = useState("");
  const [products, setProducts] = useState([]);
  const empCollectionRef = collection(db, "products");

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const data = await getDocs(empCollectionRef);
    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  return (
    <>
    {/* <div className="bgcolor"> */}
      {/* <Container>

        <img src={background} alt="" />
      </Container> */}
      <Container className=" py-2">
        <Row className="justify-content-center">
          <div
            style={{
              display: "flex",
              flexgrow: "1",
              alignItems: "center",
              borderRadius: "none",
              marginBottom: "20px",
              // position: "fixed",
              width: "100%",
            }}
          >
            <div>
              <input
                type="text"
                value={searchProduct}
                onChange={(e) => setSearchProduct(e.target.value)}
                placeholder="Search Thunder Chemical ......"
                style={{
                  width: "540px",
                  height: "38px",
                  paddingLeft: "15px",
                  border: "1px solid black",
                }}
              />
            </div>

            <SearchIcon
              size="small"
              style={{
                background: "white",
                color: "black",
                height: "38px",
                width: "38px",
                border: "1px solid black",
              }}
            />
          </div>

          {products
            .filter((item) => {
              return searchProduct.toLowerCase() === ""
                ? item
                : item.name.toLowerCase().includes(searchProduct.toLowerCase());
            })
            .map((item, i) => (
              <Products data={item} key={i} />
            ))}
        </Row>
      </Container>
      {/* </div> */}
    </>
  );
};

export default Home;
