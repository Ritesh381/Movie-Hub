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
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <NavBar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Movies />} />
            <Route path="/watchlist" element={<WatchList />} />
            <Route path="/recommend" element={<MovieRecommendation />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/info" element={<Info />} />
            <Route path="/trending" element={<TrendingPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/upcoming" element={<UpcomingPage />} />
            <Route path="/top-rated" element={<TopRatedPage />} />
          </Routes>
        </main>

        <AiBot />
        <Footer />
      </BrowserRouter>
    </div>
  );
}


export default App;
