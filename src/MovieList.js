import React from 'react';

const MovieList = ({ movies, onSelect }) => {
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <div key={movie.imdbID} className="movie-item" onClick={() => onSelect(movie)}>
          <h3>{movie.Title} ({movie.Year})</h3>
        </div>
      ))}
    </div>
  );
};

export default MovieList;