import React, { useState, useEffect } from "react";
import {collectionsApi} from "../../api";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import Collection from "Components/Collection";

export default function(props){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);
    const getCollections = async () =>{
        try {
            const parseId = props.match.params.id;
            const { data:collection } = await collectionsApi.collections(parseId);
            setResult(collection);
            console.log(collection);
        } catch {
                setError("Can't find anything.");
        } finally {
                setLoading(false);
        }
    }
    useEffect(()=>{getCollections()},[]);

    return (
        <>
        {
        loading ? (
            <Container>
                <Helmet>
                    <title>Loading | Nomflix</title>
                </Helmet>
                <Loader />
            </Container>
        ) :(
            <Container>
                <Helmet>
                    <title>Loading | Nomflix</title>
                </Helmet> 
                <Head>
                    {result.name}
                </Head>
                {/* <Backdrop
                    bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
                /> */}
                <Data>
                    {result.parts.map(element=><Collection key = {element.id} collection={element} />)}
                </Data>
            </Container>
        )}
        </>
    )
        
}

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;
const Head = styled.h1`
    color: white;
    font-weight: 900;
    font-size: 4rem;
    text-align:center;
`;
const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Data = styled.div`
    margin-left: 20px;
`;