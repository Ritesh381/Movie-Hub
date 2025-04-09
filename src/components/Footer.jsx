import React from "react";
import { Github, Mail, Youtube, Linkedin } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo & Copyright */}
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold text-amber-400">Movie Hub</h2>
          </div>

          {/* Navigation Links */}
          {/* <div className="mb-4 md:mb-0">
            <ul className="flex flex-wrap justify-center gap-4 text-sm">
              <li><a href="" className="hover:text-amber-400 transition-colors">Home</a></li>
              <li><a href="/movies" className="hover:text-amber-400 transition-colors">Movies</a></li>
              <li><a href="/tv-shows" className="hover:text-amber-400 transition-colors">TV Shows</a></li>
              <li><a href="/watchlist" className="hover:text-amber-400 transition-colors">Watchlist</a></li>
              <li><a href="/about" className="hover:text-amber-400 transition-colors">About</a></li>
            </ul>
          </div> */}
          <div>
            <a
              href="https://www.themoviedb.org/"
              className="flex h-20"
              target="_blank"
            >
              <img
                src="https://img.icons8.com/?size=512&id=AxHFXpfUuWsm&format=png"
                alt=""
              />
            </a>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href="https://github.com/Ritesh381/Movie-Hub"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-amber-400 hover:text-black transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="mailto:prajapatiritesh381@gmail.com"
              className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-amber-400 hover:text-black transition-colors"
              aria-label="Email"
              target="_blank"
            >
              <Mail size={20} />
            </a>
            <a
              href="https://www.youtube.com/@ritesh-381r"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-amber-400 hover:text-black transition-colors"
              aria-label="YouTube"
            >
              <Youtube size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/ritesh-prajapati-7830582a7/"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-amber-400 hover:text-black transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        {/* Attribution Line */}
        <div className="mt-6 text-center text-xs text-gray-500">
          Powered by TMDB API. This product uses the TMDB API but is not
          endorsed or certified by TMDB.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
