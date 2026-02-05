import { useEffect, useState } from "react";
import UserContext from "./useCon";

const MoviesProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=e345caf876ded81a18c1032f33432e80"
    )
      .then((res) => res.json())
      .then((d) => setData(d.results))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};

export default MoviesProvider;
