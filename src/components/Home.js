
import React, {useEffect, useState} from 'react';
import { Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { db, storage } from "./Firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { BiSearch } from 'react-icons/bi';
import SearchFilter from 'react-filter-search';
import Products from '../components/Products';
import { Box } from '@mui/material';

const Home = (props) => {
   
    const [searchInput, setSearchInput] = useState('');
    const [productData, setProductData] = useState([]);


    const [data, setData] = useState([])
  //  const [name, setName] = useState("");
  // const [price, setPrice] = useState("");
  // const [unit, setUnit] = useState("");
  // const [image, setImage] = useState("");
  const empCollectionRef = collection(db, "products");

  useEffect(() => {
    getUsers();
  }, []);

  
    
    const getUsers = async () => {
    const data = await getDocs(empCollectionRef);
    setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    
  };

    return (
        <Container className="py-4">
            <Row className="justify-content-center">
                <Col xs={10} md={7} lg={6} xl={4} className="mb-3 mx-auto text-center">
                    <h2>Thunder Chemical</h2>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>
                            <BiSearch size="2rem" />
                        </InputGroup.Text>
                        <FormControl 
                            placeholder="Search"
                            value={searchInput}
                            onChange={(e)=> setSearchInput(e.target.value)}
                          
                        />
                    </InputGroup>
                </Col>
        <div >
            <Box height={30}/>
                <SearchFilter 
                    value={searchInput}
                    data={data}
                    renderResults={results =>(
                        <Row className="justify-content-center">
                            {results.map((item, i)=>(
                                <Products data={item} key={i} />
                            ))}
                        </Row>
                    )}
                />
                </div>
             </Row>
         </Container>
        
    );
};

export default Home;