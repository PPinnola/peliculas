import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { Movies } from "./components/Movies";
import { useMovies, useSearch } from "./hooks";
import debounce from "just-debounce-it";

function App() {
  const [sort, setSort] = useState(false);
  const { search, setSearch, error } = useSearch();
  const { movies, getMovies, loading } = useMovies({ search, sort });

  const debounceGetMovies = useCallback(
    debounce((search) => {
      getMovies({ search });
    }, 500),
    [getMovies]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({ search });
  };

  const handleChange = (event) => {
    const newSearch = event.target.value;
    setSearch(newSearch);
    debounceGetMovies(newSearch);
  };

  const handleSort = () => {
    setSort(!sort);
  };

  return (
    <div className="page">
      <header>
        <h1 className="titlePage">Buscador de películas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            name="query"
            placeholder="Matrix, avangers ..."
            value={search}
          />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button>Buscar</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>

      <main>{loading ? <p>Cargando....</p> : <Movies movies={movies} />}</main>
    </div>
  );
}

export default App;
