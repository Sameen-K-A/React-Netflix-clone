import Navbar from "./components/Navbar";
import "../public/app.css";
import Poster from "./components/Poster";
import Row from "./components/Row";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import {romance, horror, action, originals, animeMovies} from "./config/config";

function App() {

  const toastify = (content) => {
    Toastify({
      text: content,
      duration: 3000,
      close: false,
      gravity: "top",
      position: "right",
      backgroundColor: "Red",
    }).showToast();
  };

  return (
    <>
      <Navbar />
      <Poster category={originals} page={1} toastify={toastify} />
      <Row category={horror} name={"Horror"} page={1} toastify={toastify} />
      <Row category={action} name={"Action"} page={1} toastify={toastify}/>
      <Poster category={horror} page={2} toastify={toastify}/>
      <Row category={animeMovies} name={"Animated Movies"} page={2} toastify={toastify}/>
      <Row category={romance} name={"Romance"} page={1} toastify={toastify}/>
    </>
  );
}

export default App;