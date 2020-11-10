import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import {Link} from "react-router-dom";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
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

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;
const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

const ALink = styled.a`
  display: inline-block;
  padding: 6px;
  margin-left:6px;
  font-size: 15px;
  border-radius: 24px;
  background-color:#E2B616;
  color:#000000;
  font-weight: 900;
  text-align:center;
`;
const CollectionsContainer = styled.div`
  margin: 20px 0;
  height:30%;
`;
const SLink = styled(Link)`
  display: block;
  font-size:16px;
  padding:5px;
  margin-left:10px;
`;
const Text = styled.div`
  margin-bottom:10px;
`;
const NoCollection = styled.div`
  height: 25%;
`
const DetailPresenter = ({ result, loading, error, isMovie }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Nomflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.png")
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time[0]} min
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name 
                    : `${genre.name} / `
                )}
              <ALink href={`https://www.imdb.com/title/${result.imdb_id}`}>IMDB</ALink>
            </Item>
            
          </ItemContainer>
          {isMovie ?
            <div>
              <Text>
                  <Item>Company: {result.production_companies.map(element=>`${element.name} / `)}</Item>
              </Text>
              <Text>
                  <Item>Countries: {result.production_countries.map(element=>`${element.name} / `)}</Item>
              </Text>  
            </div>
          : 
            <div>
              <Text>
                <Item>Seasons: {result.seasons.map(element=>`${element.name} / `)}</Item>
              </Text>
              <Text>
                  <Item>Creators: {result.created_by.map(element=>`${element.name} / `)}</Item>
              </Text>  
            </div>}
          
          <Overview>{result.overview}</Overview>
          <iframe width="480px" height="320px" src={`https://www.youtube.com/embed/${result.videos.results[0].key}`}></iframe>
          {result.belongs_to_collection ? 
            <CollectionsContainer>
              <Cover
              bgImage={`https://image.tmdb.org/t/p/original${result.belongs_to_collection.poster_path}`}
              />
              <SLink to={`/collections/${result.belongs_to_collection.id}`}>Go {result.belongs_to_collection.name}!</SLink>
            </CollectionsContainer>
          :
            <NoCollection>
              <Cover
                bgImage={require("../../assets/noPosterSmall.png")}
              />
              <Title>No Collections</Title>
            </NoCollection>
          }
          
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default DetailPresenter;
