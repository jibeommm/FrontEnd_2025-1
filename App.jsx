// /src/App.jsx
import { useEffect, useState } from 'react';
import './App.css';

async function fetchMovies(setMovies) {
  const API_URL = 'https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1';
  try {
    const res = await fetch(API_URL, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
      }
    });
    const data = await res.json();
    setMovies(data.results);
  } catch (err) {
    console.error('API error:', err);
  }
}

function escape(setSelectMovie) {
  return function (e) {
    if (e.key === 'Escape') {
      setSelectMovie(null);
    }
  };
}

export default function App() {
  const [movies, setMovies] = useState([]);
  const [selectMovie, setSelectMovie] = useState(null);

  useEffect(() => {
    fetchMovies(setMovies);
  }, []);

  useEffect(() => {
    const escKeydown = escape(setSelectMovie);
    window.addEventListener('keydown', escKeydown);
    return () => window.removeEventListener('keydown', escKeydown);
  }, []);

  return (
    <div className="App">
      <h1>Popular Movies</h1>
      <div id="movie_list">
        {movies.map(movie => (
          <div
            key={movie.id}
            className="movie"
            onClick={() => setSelectMovie(movie)}
          >
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <div id="p_text">
              <p id="title">{movie.title}</p>
              <p>⭐ {movie.vote_average}</p>
            </div>
          </div>
        ))}
      </div>

      {selectMovie && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setSelectMovie(null)}>❌</span>
            <div className="modal-info">
              <img src={`https://image.tmdb.org/t/p/w500${selectMovie.poster_path}`} alt={selectMovie.title} />
              <p id="title">{selectMovie.title}</p>
              <p>개봉일 : {selectMovie.release_date}</p>
              <p>평점 : ⭐{selectMovie.vote_average}</p>
              <p>줄거리 | {selectMovie.overview}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
