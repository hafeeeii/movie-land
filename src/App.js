import "./App.css";
import MovieCards from "./MovieCards";
import SearchIcon from "./Search.svg";
import { useEffect, useState } from "react";

const API_URL = "http://www.omdbapi.com/?apikey=2d9df84";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };
  useEffect(() => {
    searchMovies("batman");
  }, []);
  return (
    <div className="app">
      <h1>Movie Land</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Search For Movies"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCards movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies Found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
