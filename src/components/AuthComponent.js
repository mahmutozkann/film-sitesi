

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from '../services/AuthService';
import MovieList from './MovieList';
import { fetchPopularMovies } from '../services/api';
import loginImage from "./images/moviebackground.jpeg";
import './AuthComponent.css';

const AuthComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggedIn, setLoggedIn] = useState(AuthService.isLoggedIn());
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    const userEmail = AuthService.getCurrentUserEmail();

    useEffect(() => {
        setLoggedIn(AuthService.isLoggedIn());
    }, []);

    const handleRegister = async () => {
        try {
            const registerSuccess = await AuthService.registerUser(email, password);
            if (registerSuccess) {
                setLoggedIn(true);
                navigate('/');
            } else {
                setLoggedIn(false);
                setError("Kayıt Hatası");
            }

        } catch (error) {
            setLoggedIn(false);
            setError(error.message);
        }
    };

    const handleLogin = async () => {
        try {
            const loginSuccess = await AuthService.loginUser(email, password);
            if (loginSuccess) {
                setLoggedIn(true);
                navigate('/');
            } else {
                setLoggedIn(false);
                setError("Hatalı E-mail ya da şifre.");
            }
        } catch (error) {
            setLoggedIn(false);
            setError(error.message);
        }
    };

    const handleLogout = () => {
        AuthService.logoutUser();
        setLoggedIn(false);
        navigate('/');
    };

    useEffect(() => {
        if (isLoggedIn) {
            const fetchMovies = async () => {
                try {
                    let allMovies = [];
                    let page = 1;
                    const moviesPerPage = 90;

                    while (allMovies.length < moviesPerPage) {
                        const response = await fetchPopularMovies(page);
                        const newMovies = response.slice(0, moviesPerPage - allMovies.length);

                        if (newMovies.length === 0) {
                            break;
                        }

                        allMovies = [...allMovies, ...newMovies];
                        page++;
                    }

                    setMovies(allMovies);
                } catch (error) {
                    console.error('Error fetching movies:', error);
                    setMovies([]);
                }
            };

            fetchMovies();
        }
    }, [isLoggedIn]);

    return (
        <div className="auth-container">
            {isLoggedIn ? (
                <>
                    <div className="auth-header">
                        <h2>Movies</h2>
                        <div>
                            <button className="auth-button" onClick={handleLogout}>Logout</button>
                            <Link className='link' to="/profile">
                                <button className="auth-button">Profile</button>
                            </Link>
                        </div>
                    </div>

                    <MovieList movies={movies} onMovieClick={(movieId) => console.log(`Clicked movie with ID: ${movieId}`)} />
                </>
            ) : (
                <div className="auth-form">
                    <img src={loginImage} alt="Login Image" className="login-image" />
                    <h1>Movie Rate&List</h1>
                    <div className="auth-inputs">
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="auth-inputs">
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="auth-buttons">
                        <button onClick={handleRegister}>Register</button>
                        <button onClick={handleLogin}>Login</button>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                </div>
            )}
        </div>
    );
};

export default AuthComponent;
