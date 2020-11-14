import React from 'react';
import styled from 'styled-components';

const Img = styled.img``;

export const UnsplashImage = ({ url, key }) => {
  return (
    <>
      <Img key={key} src={url} alt="" />
    </>
  )
}