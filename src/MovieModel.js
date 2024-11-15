import React from 'react';

const MovieModal = ({ movie, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose}>Close</button>
        <h2>{movie.Title}</h2>
        <p><strong>Plot:</strong> {movie.Plot}</p>
        <p><strong>Genre:</strong> {movie.Genre}</p>
        <p><strong>Ratings:</strong> {movie.imdbRating}</p>
      </div>
    </div>
  );
};

export default MovieModal;
