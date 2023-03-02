import NavBar from "./NavBar";
import React, {useEffect, useState} from 'react';
import { Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { db, storage,auth } from "./Firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { BiSearch } from 'react-icons/bi';
import SearchFilter from 'react-filter-search';
import Products from '../components/Products';
import { Box,InputBase } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';


// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(3),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '100%',
//     },
//   },
// }));

const Home = (props) => {
   
    const [searchInput, setSearchInput] = useState('');
    const [productData, setProductData] = useState([]);


    const [data, setData] = useState([]);
    const [user, setUser] = useState(null);
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

//   const getCurrentUser = async () => {
//     const data = await getDocs(empCollectionRefUser);
//     setUser(data.docs.map((doc) => ({ ...doc.data(), id: user.uId })));
//     const user=getCurrentUser();
//   };
  // getting currentuser

  // function getCurrentUser(){
  //   const [user, setUser] = useState(null);
    
  //   useEffect(() => {
  //     auth.onAuthStateChanged(user=>{
  //       if(user){
  //        db.collection("user").doc(user.uId).get().then(snapshot=>{
  //         setUser(snapshot.data().fullname);
  //        })
  //       }
  //       else{
  //         setUser(null);
  //       }
  //     })
    
      
  //   }, [])
  //   return user;
  //   }
  
    // const user=getCurrentUser();

    return (
        <>      
        {/* <NavBar user={user}/> */}
        <NavBar/>
        {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Thunder Chemical..."
              inputProps={{ 'aria-label': 'search' }}
              value={searchInput}
                            onChange={(e)=> setSearchInput(e.target.value)}
            />
          </Search> */}
          
          <Container className="py-4">
            <Row className="justify-content-center">
                <Col xs={10} md={7} lg={6} xl={4} className="mb-3 mx-auto text-center">
                    {/* <h2>Thunder Chemical</h2> */}
                    <InputGroup className="mb-3">
                       
                        <FormControl 
                            placeholder="Search Thunder Chemical....."
                            value={searchInput}
                            onChange={(e)=> setSearchInput(e.target.value)}
                          sx={{ pointerEvents: 'none'}}
                        />
                         <InputGroup.Text>
                            <BiSearch size="2rem" />
                        </InputGroup.Text>
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
         </>

    );
};

export default Home;