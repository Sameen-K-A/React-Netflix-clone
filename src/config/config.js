const API_KEY = "aeff4ae34a1b44cc55f135bd76551d04";
const baseUrl = "https://api.themoviedb.org/3/";
const imageUrl = 'https://image.tmdb.org/t/p/';

const originals = `discover/tv?api_key=${API_KEY}&with_networks=213&page=`;
const action = `discover/movie?api_key=${API_KEY}&with_genres=28&page=`;
const horror = `discover/movie?api_key=${API_KEY}&with_genres=27&page=`;
const romance = `discover/movie?api_key=${API_KEY}&with_genres=10749&page=`;
const animeMovies = `discover/movie?api_key=${API_KEY}&with_genres=16&page=`;


export {
    API_KEY,
    baseUrl,
    imageUrl,
    originals,
    action,
    horror,
    romance,
    animeMovies
}