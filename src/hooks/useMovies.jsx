import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { searchMovies } from "../service/movies";

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const previusSearch = useRef(search);

  // el use callback se utiliza para las funciones, el useMemo para las constantes
  const getMovies = useCallback(async ({ search }) => {
    if (search === previusSearch.current) return;

    try {
      setLoading(true);
      setError(null);
      previusSearch.current = search;
      const newMovies = await searchMovies({ search });
      setMovies(newMovies);
    } catch (error) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  //esto se utiliza para que si se escribe en el input, pero no cambian el orden o el movies, no se carguen todas las pelicula nuevamente
  const sortedMovies = useMemo(() => {
    if(movies === "") return null;
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [sort, movies]);

  return { movies: sortedMovies, getMovies, loading };
}
