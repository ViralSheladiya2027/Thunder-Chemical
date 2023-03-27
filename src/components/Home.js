import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import SearchFilter from "react-filter-search";
import Products from "../components/Products";
import { db } from "./Firebase";
import SearchIcon from "@mui/icons-material/Search";

const Home = () => {
  const [searchProduct, setSearchProduct] = useState("");
  // const [productData, setProductData] = useState([]);
  const [products, setProducts] = useState([])
  // const [data, setData] = useState([]);
  const empCollectionRef = collection(db, "products");
 
  useEffect(() => {
    // if(searchProduct.legnth>0){
    const newProducts = products.filter((value) =>
      value.name.toLowerCase().includes(searchProduct.toLowerCase())
    );
    setProducts(newProducts);
    // }
  }, [searchProduct]);

  useEffect(() => {
    getProducts();
    
  }, []);



  const getProducts = async () => {
    const data = await getDocs(empCollectionRef);
    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  return (
    <>
     

      <Container className="py-2">
        <Row className="justify-content-center">
      
        <div position="fixed"
              style={{
                display: "flex",
                flexgrow: "1",
                alignItems: "center",
                borderRadius: "none",
                marginBottom : "20px",
                // padding: "auto",
                // padding: "15px",
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
                    // width: "640px",
                    width: "540px",
                    height: "38px",
                    paddingLeft:"15px",
                    border: "1px solid black",
                    // outline: "none",
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
                    // paddingRight:"5px",
                    border:"1px solid black"
                  }}
                />
            
            </div>

            {products.map((item,i)=>(        
              
<Products data={item} key={i}  />
            )
            )}
          {/* </div> */}
        </Row>
      </Container>
    </>
  );
};

export default Home;
