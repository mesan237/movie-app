// const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZmEwMjU0NjIyYmJiYWJiZDA2MzFmZGJjNjg4NWNmNyIsIm5iZiI6MTc1MTYyMjkxMi42OTEsInN1YiI6IjY4NjdhNTAwOTVhNmNlZTI4MzdhYjkwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g3u1nK_7Bl-m402Z0pwdMLnYuVDNhIQZBb-g1xJhlF4'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));

const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,

  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLI_MOVIE_ACCESS_TOKEN}`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/discover/movie?=${encodeURIComponent(
        query
      )}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    // @ts-ignore
    throw new Error("Failed to fetch new movies", response.statusText);
  }

  const data = response.json();

  return data;
};
