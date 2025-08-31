import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { MyContext } from "../Context/WatchListContext";

const supabaseUrl = import.meta.env.VITE_PROJ_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

function Signup() {
  const [mailExist, setMailExist] = useState(false);
  const {watchList} = useContext(MyContext)

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setMailExist(false)
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  const exists = async (mail) => {
    const { data, error } = await supabase
      .from("movie-hub-authentication")
      .select("email")
      .eq("email", mail)
      .limit(1);

      if (error) {
        console.error("Supabase error:", error);
        return false;
      }
      // console.log(data)
      return data.length>0;  // returns true if data exists, false otherwise
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(mailExist) return 
    // console.log("Signup form submitted:", form);
    const email = form.email;
    const name = form.name;
    const password = form.password;

    // validating if already exists
    const alreadyExists = await exists(email);
    if (!alreadyExists) {
      const {data, error} = await supabase.from("movie-hub-authentication").insert([
        {
          email: email,
          fullname: name,
          password: password,
          watchList:JSON.stringify(watchList)
        }
      ])
      if(error){
        console.error(error)
        alert("There was some error adding you. Please try again.")
      }
      else {
        alert("Signup successful! You can now login.");
      }
    } else {
      setMailExist(true);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center px-4 text-black">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          {mailExist && (
            <p className="text-red-400">This email is already registered</p>
          )}
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
          <button
            type="submit"
            className="w-full py-2 px-4 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-all duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-red-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
