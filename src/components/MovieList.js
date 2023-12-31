

import React, { useState } from 'react';
import './MovieList.css';
import MovieDetailPanel from './MovieDetailPanel';
import AuthService from '../services/AuthService';

const MovieList = ({ movies, onMovieClick }) => {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const isLoggedIn = AuthService.isLoggedIn();

    const handleMovieClick = (movie) => {
        setSelectedMovie(movie === selectedMovie ? null : movie);
        onMovieClick(movie.id);
    };

    return (
        <div className="movie-list-container">

            {isLoggedIn && movies.length > 0 ? (
                <div className="movie-cards-container">
                    {movies.map((movie) => (
                        <div
                            key={movie.id}
                            onClick={() => handleMovieClick(movie)}
                            className={`movie-card ${selectedMovie && selectedMovie.id === movie.id ? 'selected' : ''}`}
                        >
                            <div className="movie-card-image">
                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                            </div>

                        </div>
                    ))}
                </div>
            ) : (
                <p>{isLoggedIn ? 'No movies available.' : 'Please log in to see movies.'}</p>
            )}
            <MovieDetailPanel selectedMovie={selectedMovie} />

        </div>
    );
};

export default MovieList;
