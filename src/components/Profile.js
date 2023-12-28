// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import AuthService, { db } from '../services/AuthService';
import './Profile.css'
import { getDocs, collection } from 'firebase/firestore';

const Profile = () => {
    const [watchlist, setWatchlist] = useState([]);
    const userId = AuthService.getCurrentUserId();

    useEffect(() => {
        if (userId) {

            const userWatchlistRef = collection(db, 'watchlists', userId, 'movies');


            const fetchWatchlist = async () => {
                try {
                    const querySnapshot = await getDocs(userWatchlistRef);
                    const movies = [];
                    querySnapshot.forEach((doc) => {

                        movies.push(doc.data());
                    });
                    setWatchlist(movies);
                } catch (error) {
                    console.error('Hata:', error);
                }
            };


            fetchWatchlist();
        }
    }, [userId]);

    return (
        <div>
            <h1>Profile</h1>
            {watchlist.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Poster</th>
                            <th>Title</th>
                            <th>Overview</th>

                        </tr>
                    </thead>
                    <tbody>
                        {watchlist.map((movie) => (
                            <tr key={movie.id}>
                                <td>
                                    {movie.poster_path && (
                                        <img className='profile-img'
                                            src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                                            alt={`${movie.title} Poster`}
                                        />
                                    )}
                                </td>
                                <td>{movie.title}</td>
                                <td>{movie.overview}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Watchlist is empty.</p>
            )}
        </div>
    );
};

export default Profile;
