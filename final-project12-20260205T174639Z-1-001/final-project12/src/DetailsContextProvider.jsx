import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DetailsContext from "./DetailsContext";

export const DetailsContextProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { series_id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/tv/${series_id}?api_key=e345caf876ded81a18c1032f33432e80`
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const d = await res.json();
        setData(d);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [series_id]);

  return (
    <DetailsContext.Provider value={{ data, loading, error }}>
      {children}
    </DetailsContext.Provider>
  );
};
