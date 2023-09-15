import { useEffect, useRef, useState } from "react";

export function useSearch() {
    const [search, setSearch] = useState("");
    const [error, setError] = useState(null);
    const isFirstInput = useRef(true); //para preguntar si es la primera vez 
  
    useEffect(() => {
      if (isFirstInput.current) {
        isFirstInput.current = search === "";
        return;
      }
  
      if (search === "") {
        setError("No se puede buscar una película vacia");
        return;
      }
  
      if (search.match(/^\d+$/)) {
        setError("No se puede buscar una película con un número");
        return;
      }
  
      if (search.length < 3) {
        setError("La búsqueda debe tener almenos 3 caracteres");
        return;
      }
  
      setError(null);
    }, [search]);
  
    return { search, setSearch, error };
  }

