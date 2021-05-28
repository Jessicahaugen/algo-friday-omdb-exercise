import React, { useEffect, useState } from 'react'
import { Button, Col, Form, FormControl, InputGroup, Row } from 'react-bootstrap'
import Loader from './Loader/Loader'
import MovieCard from './MovieCard'
import NoMoviesFound from './NoMoviesFound'
import { useDispatch,useSelector} from "react-redux";
import {changeLoadState,changeBack} from '../Actions/AppActions'

// import {REACT_APP_OMDB_API_KEY} from ''



export default function MoviePage() {
  const [search, setSearch] = useState("")
  const [movies, setMovies] = useState([])
  // const [loading, setLoading] = useState(false)
  const loading = useSelector((state) => state.loading);
  const dispatch =useDispatch()
  // const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

  useEffect(() => {
    const getDefaultMovies = async () => {
      changeLoadState(dispatch);
      const response = await fetch(`http://www.omdbapi.com/?apikey=22ac846c&s=DarkKnight`, {
        headers: { Accept: "application/json" },
      });
      const parsedData = await response.json();
      setMovies(parsedData.Search);
      
      changeBack(dispatch)
    };
    getDefaultMovies()
  }, [])
  
  const getMovies = async () => {
    changeLoadState(dispatch);
    const response = await fetch(`http://www.omdbapi.com/?apikey=22ac846c&s=${search}`, {
      headers: { Accept: "application/json" },
    });
    const parsedData = await response.json();
    
    console.log(parsedData.Search)
    if (parsedData.Search) {
      setMovies(parsedData.Search);
    } else {
      setMovies([])
    }
    changeBack(dispatch)
  };
  
  return (
    <div className="main-page-content">
      <h1 className="main-header">Moviflix</h1>
      <h3 className="sub-header">User, try searching for any Movie</h3>
      <Form className="search-form"
        onSubmit={(e) => {
          e.preventDefault();
          getMovies()
        }}>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search Movies"
            aria-label="Search Movies"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            required
            />
          <InputGroup.Append>
            <Button type="submit" variant="secondary">
              Search
              </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
      {
        !movies ?
          <NoMoviesFound /> :
          ( loading ? 
            (
              <Loader />
            ) : (
              <Row className="movie-container">
                {movies.map((movie) => {
                  return (
                    <Col
                      
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                      className="mb-4"
                    >
                      <MovieCard movies={movie} key={movie.imdbID}/>
                    </Col>
                    
                  );
                })}
                
              </Row>
              
            )
          )
      }
    </div>
  )
}

