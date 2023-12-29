

import React from 'react';
import './MovieDetailPanel.css';
import AuthService, { db } from '../services/AuthService';
import { addDoc, collection } from 'firebase/firestore';

const MovieDetailPanel = ({ selectedMovie }) => {
    if (!selectedMovie) {
        return null;
    }
    const userId = AuthService.getCurrentUserId();

    const handleAddToWatchList = async () => {
        try {
            if (!userId) {
                console.error('Kullanıcı bilgileri alınamadı.');
                return;
            }


            const userWatchlistRef = collection(db, 'watchlists', userId, 'movies');


            await addDoc(userWatchlistRef, selectedMovie);
            console.log("Film watchlist'e eklendi.");
        } catch (e) {
            console.error('Hata:', e);
        }
    };

    return (
        <div className="movie-detail-panel">
            <h2>{selectedMovie.title}</h2>
            <p>{selectedMovie.overview}</p>
            <button onClick={handleAddToWatchList}>Add to Watch List</button>

        </div>
    );
};

export default MovieDetailPanel;
