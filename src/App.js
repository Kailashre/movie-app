
import React, { useState, useEffect } from 'react';
import SearchBar from './SerachBar';
import MovieList from './MovieList';
import MovieModal from './MovieModel';
import './App.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState(null);

  const fetchMovies = async (searchQuery) => {
    try {
      const response = await fetch(`http://www.omdbapi.com/?apikey=fbaa95d0&s=${searchQuery}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        console.error('Error from OMDB API:', data.Error);
        setError(data.Error);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('An error occurred while fetching data.');
    }
  };

  useEffect(() => {
    fetchMovies('popular');
  }, []);

  const handleSearch = () => {
    if (query) {
      setError(null);
      fetchMovies(query);
    }
  };

  const fetchMovieDetails = async (movieId) => {
    try {
      const response = await fetch(`http://www.omdbapi.com/?apikey=fbaa95d0&i=${movieId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.Response === 'True') {
        setSelectedMovie(data);
      } else {
        console.error('Error from OMDB API:', data.Error);
        setError(data.Error);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('An error occurred while fetching movie details.');
    }
  };

  return (
    <div className="App">
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
      {error && <div className="error-message">{error}</div>}
      <MovieList movies={movies} onSelect={(movie) => fetchMovieDetails(movie.imdbID)} />
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
    </div>
  );
};

export default App;
