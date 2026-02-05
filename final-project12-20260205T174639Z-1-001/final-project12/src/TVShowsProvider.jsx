import { useEffect, useState } from "react";
import TVShowsContext from "./TVShowsContext";

const TVShowsProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/tv/popular?api_key=97825c5a2cef55a703492a20877b323d"
    )
      .then((res) => res.json())
      .then((d) => setData(d.results))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return <TVShowsContext.Provider value={data}>{children}</TVShowsContext.Provider>;
};

export default TVShowsProvider; 