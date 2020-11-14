//import logo from './logo.svg';
//import './App.css';
//import './index.css';
import React, {useState, useEffect} from 'react';
import {Heading} from './components/Heading';
import {Loader} from './components/Loader';
import {UnsplashImage} from './components/UnsplashImage';
import axios from 'axios';
import styled from 'styled-components';
import {createGlobalStyle} from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry from 'react-masonry-css';
import Image from './Image';
import 'bootstrap/dist/css/bootstrap.min.css';
//<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
//<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>


const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body{
    font-family: sans-serif;
  }
`;

const WrapperImage = styled.section`
  max-width : 70rem;
  margin : 4rem auto;
  display : grid;
  grid-gap : 1em;
  grid-template-columns : repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-rows : 300px;
`;

const App = () => {

  const [images, setImages] = useState([]);

  useEffect(() => {
      fetchImages();
    }, [])

  const fetchImages = () =>{
    const apiRoot = "https://api.unsplash.com";
    const accessKey = process.env.REACT_APP_ACCESSKEY;
      
    axios
      .get(`${apiRoot}/photos/random?client_id=${accessKey}&count=12`)//using count for initial images for loading
      .then(res => setImages([...images, ...res.data]))    
  }

  const breakpointsColumnsObj = {
    default: 6,
    1200: 3,
    992: 3,
    768: 2,
    576: 1,
  };

  return (
    <div className="App">
      <Heading />
      <GlobalStyle />
      
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <InfiniteScroll 
              dataLength={images.length}
              next = {fetchImages}
              hasMore = {true}
              loader = {<Loader />}
            >
              <WrapperImage>
                {images.map(image => (
                <UnsplashImage url={image.urls.thumb} key={image.id}/>
                ))}
              </WrapperImage>
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
