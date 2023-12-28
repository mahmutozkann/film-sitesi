import axios from 'axios';

const API_KEY = 'be09c404e8cbce6856b231eb483ecc4d';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchPopularMovies = async (page = 1, perPage = 50) => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/popular`, {
            params: {
                api_key: API_KEY,
                page: page,
                per_page: perPage,
            },
        });
        console.log(response.data.results)
        return response.data.results;
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        return [];
    }
};

export const fetchMovieDetails = async (movieId) => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=images`);
        return response.data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        return null;
    }
};
