import './App.css';
import api from './api/axiosConfig';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';
import NotFound from './components/notFound/NotFound';

function App() {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  
  // Fetch the list of movies
  const getMovies = async () => {
    try {
      const response = await api.get("/movies");
      setMovies(response.data);
    } catch (err) {
      console.error("Failed to fetch movies:", err);
    }
  };

  // Fetch reviews for a specific movie
  const getReviews = async (imdbId) => {
    try {
        const response = await api.get(`/reviews/${imdbId}`);
        console.log("Fetched Reviews:", response.data);
        setReviews(response.data);
    } catch (err) {
        console.error("Error fetching reviews:", err);
    }
};

const getMovieData = async (imdbId) => {
    try {
        const response = await api.get(`/movies/${imdbId}`);
        console.log("Fetched Movie Data:", response.data);
        setMovie(response.data);
    } catch (err) {
        console.error("Error fetching movie data:", err);
    }
};


  useEffect(() => {
    getMovies(); // Fetch movies on component mount
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route index element={<Home movies={movies} />} />
        <Route path="Trailer/:ytTrailerId" element={<Trailer />} />
        <Route path="/Reviews/:imdbId/:flag" element={
          <Reviews 
            getMovieData={getMovieData} 
            movie={movie} 
            reviews={reviews} 
            setReviews={setReviews} 
            getReviews={getReviews} 
          />
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
