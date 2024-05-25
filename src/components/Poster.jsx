import "../../public/poster.css";
import { useState, useEffect } from "react";
import { baseUrl, imageUrl, API_KEY } from "../config/config";
import axios from "axios";
import { Poster_Shimming } from "../components/shimming";
import YouTube from "react-youtube";

const Poster = ({ category, page, toastify }) => {
  const [posterData, setPosterData] = useState(null);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    axios
      .get(`${baseUrl + category + page}`)
      .then((response) => setPosterData(response.data.results[15]))
      .catch(() => toastify("Something wrong, please try again later"));
  }, []);

  const openYoutube = (trailerID)=> {
    axios
      .get(`${baseUrl}movie/${trailerID}/videos?api_key=${API_KEY}&language=en-US`)
      .then((response)=> {
        if(response.data.results.length != 0) setTrailer(response.data.results[0])
        else toastify("This video is currently not available.");
      })
      .catch(() => toastify("Something wrong, please try again later"));
  }

  const options = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <>
      {!posterData ? (
        <Poster_Shimming />
      ) : (
        <div className="poster-container">
          <div className="movie_poster" style={{ backgroundImage: `url(${imageUrl}w1280${posterData.backdrop_path})` }}>
            <div className="text-fields">
              <h1>{posterData.original_title ? posterData.original_title : posterData.original_name}</h1>
              <div className="buttons">
                <button onClick={()=>openYoutube(posterData.id)}><svg xmlns="http://www.w3.org/2000/svg" height="12" width="9" viewBox="0 0 384 512"><path fill="#ffffff" d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>Play</button>
                <button><svg xmlns="http://www.w3.org/2000/svg" height="12" width="10.5" viewBox="0 0 448 512"><path fill="#ffffff" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>My List</button>
              </div>
              <p>{posterData.overview}</p>
            </div>
          </div>
        </div>
      )}
      {trailer && <div className="youtube_container">
        <button className="youtube_button" onClick={()=>setTrailer(null)}>close</button>
        <YouTube videoId={trailer.key} opts={options} />
      </div>}
    </>
  );
};

export default Poster;