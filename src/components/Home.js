import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import SearchFilter from "react-filter-search";
import Products from "../components/Products";
import { db } from "./Firebase";

const Home = ({searchProduct}) => {
  // const [searchInput, setSearchInput] = useState("");
  // const [productData, setProductData] = useState([]);
  const [products, setProducts] = useState([])
  // const [data, setData] = useState([]);
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
     

      <Container className="py-4">
        <Row className="justify-content-center">
          {/* <Col xs={10} md={7} lg={6} xl={4} className="mb-3 mx-auto text-center"> */}
          {/* <h2>Thunder Chemical</h2> */}

          {/* </Col> */}
          {/* <div>
      
            <SearchFilter
              value={searchProducts}
              data={product}
              renderResults={(results) => (
                <Row className="justify-content-center">
                  {results.map((item, i) => (
                    <Products data={item} key={i} />
                  ))}
                </Row>
              )}
            />
          </div> */}
          {/* <div> */}
          {/* data={product} */}
          {/* value={searchProduct} */}
            {products.map((item,i)=>(        
<Products data={item} key={i} />
            )
            )}
          {/* </div> */}
        </Row>
      </Container>
    </>
  );
};

export default Home;
