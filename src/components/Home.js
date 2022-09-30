
import React, {useEffect, useState} from 'react';
import { Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';

import { BiSearch } from 'react-icons/bi';
import SearchFilter from 'react-filter-search';
import Products from '../components/Products';

const Home = () => {
   
    const [searchInput, setSearchInput] = useState('');
    const [productData, setProductData] = useState([]);

    async function getResponse(){
        const res = await fetch('https://fakestoreapi.com/products')
                          .then(res=> res.json());
                          setProductData(await res);
    }

    useEffect(()=>{
        getResponse();
    },[]);

    return (
        <Container className="py-4">
            <Row className="justify-content-center">
                <Col xs={10} md={7} lg={6} xl={4} className="mb-3 mx-auto text-center">
                    <h1>Search products</h1>
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
                <SearchFilter 
                    value={searchInput}
                    data={productData}
                    renderResults={results =>(
                        <Row className="justify-content-center">
                            {results.map((item, i)=>(
                                <Products data={item} key={i} />
                            ))}
                        </Row>
                    )}
                />
                
            </Row>
        </Container>
    );
};

export default Home;