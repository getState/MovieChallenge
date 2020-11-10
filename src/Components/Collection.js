import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Collection = ({collection}) =>(
    <Container>
        {console.log(collection)}
        <Cover bgImage={`https://image.tmdb.org/t/p/original${collection.poster_path}`}></Cover>
        <Data>
            <Title>{collection.title}</Title>
            <Overview>{collection.overview}</Overview>
        </Data>
        
    </Container>
)

const Container = styled.div`
    display: flex;
    padding: 20px;
    height: 30%;
`;

const Cover = styled.img`
  width: 30%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 180px;
  
  border-radius: 5px;
`;
const Data = styled.div`
    display: flex;
    flex-direction:column;
    width: 100%;
`;
const Title = styled.h1`
    font-size:24px;
    margin-left:20px;
`
const Overview = styled.div`
    font-size:16px;
    margin-left:20px;
    margin-top: 20px;
`
export default Collection;