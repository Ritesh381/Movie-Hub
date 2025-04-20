import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { AuthContext } from "../Context/Auth";
import { MyContext } from "../Context/WatchListContext";

const supabaseUrl = import.meta.env.VITE_PROJ_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

function Login() {
  const { setUsername, setAuthenticated, authenticated, setEmail } =
    useContext(AuthContext);
  const navigate = useNavigate();
  
  
  useEffect(() => {
    if (authenticated) {
      navigate("/");
    }
  }, [authenticated]);
  
  const { watchList, setWatchList } = useContext(MyContext);
  const [wrong, setWrong] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setWrong(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWrong(false);

    const email = form.email;
    const password = form.password;

    try {
      const { data: userData, error: userError } = await supabase
        .from("movie-hub-authentication")
        .select("email, password, fullname, watchList")
        .eq("email", email)
        .eq("password", password)
        .single();

      if (userError || !userData) {
        console.error("Login failed:", userError);
        setWrong(true);
        return;
      }

      setAuthenticated(true);
      setUsername(userData.fullname);
      setEmail(userData.email)

      // Handle watchList merging
      let userWatchList = [];
      try {
        userWatchList = JSON.parse(userData.watchList || "[]");
      } catch (err) {
        console.warn(
          "Could not parse user's watchList, setting as empty array."
        );
      }
      // console.log(userData)
      // Merge and remove duplicates
      const combinedWatchList = [
        ...watchList,
        ...userWatchList.filter(
          (item) =>
            !watchList.some((existingItem) => existingItem.id === item.id)
        ),
      ];
      
      setWatchList(combinedWatchList);

      // Update Supabase if local list had new items
      if (combinedWatchList.length !== userWatchList.length) {
        const { error: updateError } = await supabase
          .from("movie-hub-authentication")
          .update({ watchList: JSON.stringify(combinedWatchList) }) // ensure it's a JSON string
          .eq("email", email);

        if (updateError) {
          console.error("Error updating watchList:", updateError);
        }
      }

      navigate("/");
    } catch (err) {
      console.error("Unexpected error during login:", err);
      setWrong(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Welcome Back 👋
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            autoComplete="off"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          {wrong && <p className="text-red-400">Email or Password is wrong</p>}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-all duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-red-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
