import "./App.css";
import responseMovies from "./api/with-result.json";
import noResult from "./api/no-result.json";
import { Movies } from "./components/Movies";

function App() {
  const movies = responseMovies.Search;
  

  

  return (
    <div className="page">
      <header>
        <h1>Películas</h1>
        <form className="form">
          <input placeholder="Matrix, avangers ..."></input>
          <button>Buscar</button>
        </form>
      </header>

      <main><Movies movies={movies} /></main>
    </div>
  );
}

export default App;
