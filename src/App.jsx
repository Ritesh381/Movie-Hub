import "./App.css";
import Login from "./components/Authentication/Login";
import MovieRecommendation from "./components/MovieRecommendation";
import Movies from "./components/Movies";
import NavBar from "./components/NavBar";
import Signup from "./components/Authentication/Signup";
import WatchList from "./components/WatchList/WatchList";
import Info from "./components/Info/Info";
import TrendingPage from "./components/HomePageComponents/TrendingPage";
import SearchPage from "./components/SearchPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UpcomingPage from "./components/HomePageComponents/UpcomingPage";
import TopRatedPage from "./components/HomePageComponents/TopRatedPage";
import AiBot from "./components/AiBot/AiBot";
import { Suspense } from "react";

function App() {
  return (
    <>
      <Suspense fallback={<h1>Loading .... </h1>}>
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
          <AiBot />
        </BrowserRouter>
      </Suspense>
    </>
  );
}

export default App;
