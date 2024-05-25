import { useEffect, useState } from "react";
import { baseUrl, imageUrl, API_KEY } from "../config/config";
import { Row_Shimming } from "./shimming";
import YouTube from "react-youtube";
import axios from "axios";
import "../../public/row.css";

const Row = ({ category, name, page, toastify }) => {
  const [movies, setMovies] = useState([]);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    axios
      .get(`${baseUrl + category + page}`)
      .then((responce) => {
        const filtered = responce.data.results.slice(3);
        setMovies(filtered);
      })
      .catch(() => toastify("Something wrong, please try again later"));
  }, []);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const openYoutube = (videoID) => {
    axios
      .get(`${baseUrl}movie/${videoID}/videos?api_key=${API_KEY}&language=en-US`)
      .then((responce) => {
        if (responce.data.results.length != 0)setTrailer(responce.data.results[0]);
        else toastify("This video is currently not available.")
      })
      .catch(() => toastify("Something wrong, Please try again later"));
  };

  return (
    <div className="row_main">
      <h3 style={{ color: "white" }}>{name}</h3>
      <div className="row_container">
        {movies.length == 0 ? (
          <Row_Shimming />
        ) : (
          movies.map((movie) => {
            return (
              <div className="row_container_child" onClick={() => openYoutube(movie.id)} key={movie.id} style={{backgroundImage: `url(${imageUrl}w1280${movie.backdrop_path})`}}></div>
            );
          })
        )}
      </div>
      {trailer && (
        <div className="youtube_container">
          <button className="youtube_button" onClick={() => setTrailer(null)}>close</button>
          <YouTube videoId={trailer.key} opts={opts} />
        </div>
      )}
    </div>
  );
};

export default Row;