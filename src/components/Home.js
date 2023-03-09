import NavBar from "./NavBar";
import React, {useEffect, useState} from 'react';
import { Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { db, storage,auth } from "./Firebase";
import {  onAuthStateChanged } from "firebase/auth";

import { collection, getDocs, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { BiSearch } from 'react-icons/bi';
import SearchFilter from 'react-filter-search';
import Products from '../components/Products';
import { Box,Button,InputBase } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';


const Home = (props) => {
   
    const [searchInput, setSearchInput] = useState('');
    const [productData, setProductData] = useState([]);


    const [data, setData] = useState([]);
    // const [user, setUser] = useState(null);
  //  const [name, setName] = useState("");
  // const [price, setPrice] = useState("");
  // const [unit, setUnit] = useState("");
  // const [image, setImage] = useState("");
  const empCollectionRef = collection(db, "products");
//   const empCollectionRefUser = collection(db, "user");

  useEffect(() => {
    getProducts();
    // getCurrentUser();
  }, []);

  
    
    const getProducts = async () => {
    const data = await getDocs(empCollectionRef);
    setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    
  };



  function getCurrentUser(){
    const [user, setUser] = useState(null);
    
    useEffect(() => {
      auth.onAuthStateChanged(user=>{
        if(user){
         db.collection("users").doc(user.uid).get().then(snapshot=>{
          setUser(snapshot.data().fullname);
         })
        }
        else{
          setUser(null);
        }
      })
    
      
    }, [])
    return user;
    }
  
    const user=getCurrentUser();

    return (
        <>      
        <NavBar user={user}/>
        
        {/* <NavBar/>  */}
           <div className="mb-3" sx={{ border : 'none',width:"80%",outline:"none",padding:"0 15px"}}>
                
                       <input type="text"
                           placeholder="Search Thunder Chemical....."
                           value={searchInput}
                           onChange={(e)=> setSearchInput(e.target.value)}
                        // 
                      />
                      {/* <Button>   */}
                      <BiSearch size="2rem" />
                      {/* </Button> */}
                        {/* <InputGroup.Text> */}
                          
                       {/* </InputGroup.Text> */}
                       
                   </div>
          <Container className="py-4">
            <Row className="justify-content-center">
                {/* <Col xs={10} md={7} lg={6} xl={4} className="mb-3 mx-auto text-center"> */}
                    {/* <h2>Thunder Chemical</h2> */}
                   
                {/* </Col> */}
        <div >
            {/* <Box height={30}/> */}
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
         </>

    );
};

export default Home;