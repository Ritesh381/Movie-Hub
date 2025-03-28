import "./App.css";
import Login from "./components/Login";
import MovieRecommendation from "./components/MovieRecommendation";
import Movies from "./components/Movies";
import NavBar from "./components/NavBar";
import Signup from "./components/Signup";
import WatchList from "./components/WatchList";
import Info from "./components/Info";
import TrendingPage from "./components/TrendingPage";
import SearchPage from "./components/SearchPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UpcomingPage from "./components/UpcomingPage";
import TopRatedPage from "./components/TopRatedPage";

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
          <Route path="/trending" element={<TrendingPage />}></Route>
          <Route path="/search" element={<SearchPage />}></Route>
          <Route path="/upcoming" element={<UpcomingPage />}></Route>
          <Route path="/top-rated" element={<TopRatedPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
