import "./App.css";
import Login from "./components/Login";
import MovieRecommendation from "./components/MovieRecommendation";
import Movies from "./components/Movies";
import NavBar from "./components/NavBar";
import Signup from "./components/Signup";
import WatchList from "./components/WatchList";
import Info from "./components/Info";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/watchlist" element={<WatchList />} />
          <Route path="/recommend" element={<MovieRecommendation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/info" element={<Info />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
