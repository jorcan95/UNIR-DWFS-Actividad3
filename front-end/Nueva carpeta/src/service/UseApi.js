import { useState, useEffect } from 'react';

export const UseApi = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
  
        try {
          const response = await fetch(url);
          if (response.ok) {
            const json = await response.json();
            setData(json);
          } else {
            setError('Error al obtener los datos');
          }
        } catch (error) {
          setError('Error de conexión');
        }
  
        setIsLoading(false);
      };
  
      fetchData();
    }, [url]);
  
    return { data, isLoading, error };
}