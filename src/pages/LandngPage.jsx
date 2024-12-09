import React from "react";
import { useNavigate } from "react-router-dom";
import image1 from "../assets/images/img1.png";
import image2 from "../assets/images/img2.png";
import logo from "../assets/images/museo.png";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="navbar fixed top-0 w-full z-50 bg-white h-20 flex items-center justify-between px-5 shadow-lg">
        <div className="title">
          <img className="w-52" src={logo} alt="Logo" />
        </div>
        <ul className="flex space-x-6 text-lg">
          <li className="hover:underline">
            <a href="#">Features</a>
          </li>
          <li className="hover:underline">
            <a href="#">Artist</a>
          </li>
          <li className="hover:underline">
            <a href="#">Community</a>
          </li>
          <li className="hover:underline">
            <a href="#">About Us</a>
          </li>
        </ul>
        <button
          className="bg-black text-white py-2 px-6 rounded-full"
          onClick={() => navigate("/signin")}
        >
          Sign In
        </button>
      </div>

      <section className="flex flex-col md:flex-row items-center justify-between h-screen px-5 md:px-20 mt-24">
        <div className="text-left md:w-1/2">
          <h1 className="text-5xl font-bold leading-tight mb-4">
            Imagination ignites, Artistry ignites.
          </h1>
          <p className="text-xl font-light mb-6 md:mr-32">
            Muzeum is a modern web application designed to serve as an
            art-related open platform for artists to showcase and share their
            artwork publicly. Whether you're a newbie or experienced artist,
            this community platform will inspire and connect you with other
            creatives.
          </p>
          <button className="bg-black text-white py-2 px-6 rounded-full">
            Explore
          </button>
        </div>
        <div className="flex flex-col items-center md:items-end md:w-1/2 mt-10 md:mt-0">
          <img
            src={image2}
            className="transform -rotate-12 mb-4 md:w-96"
            alt="Artwork 2"
          />
          <img
            src={image1}
            className="transform skew-x-[-10deg] md:w-96"
            alt="Artwork 1"
          />
        </div>
      </section>

      <section className="bg-[#A272BE] text-white flex items-center justify-center h-screen px-5 md:px-20">
        <div className="text-center md:w-1/2">
          <h5 className="text-4xl font-bold uppercase mb-6">
            Create Your Own Art
          </h5>
          <div className="flex justify-center space-x-4 mb-6">
            <img src="./img/art25.jpg" className="w-48 h-48" alt="Art 1" />
            <img src="./img/art21.png" className="w-36 h-36" alt="Art 2" />
            <img src="./img/art19.png" className="w-36 h-36" alt="Art 3" />
            <img src="./img/art7.jpg" className="w-48 h-72" alt="Art 4" />
            <img src="./img/art2.jpg" className="w-56 h-56" alt="Art 5" />
          </div>
          <button className="bg-black text-white py-2 px-6 rounded-full">
            Explore
          </button>
        </div>
      </section>

      <section className="flex items-center justify-center h-screen px-5">
        <div className="text-center w-full md:w-1/2">
          <h5 className="text-3xl font-bold mb-6">
            Share for Your Inspiration Art
          </h5>
          <div className="flex justify-center space-x-4 mb-6">
            <img src="./img/img2.png" className="w-56 h-56" alt="Share Art 1" />
            <img src="./img/img1.png" className="w-64 h-64" alt="Share Art 2" />
            <img src="./img/img3.png" className="w-48 h-48" alt="Share Art 3" />
          </div>
          <button className="bg-black text-white py-2 px-6 rounded-full">
            Explore
          </button>
        </div>
      </section>

      <section className="bg-gray-100 flex items-center justify-center h-screen px-5">
        <div className="text-center w-full md:w-1/2">
          <h1 className="text-5xl font-bold mb-4">
            Sign Up for More Inspirational Arts
          </h1>
          <div className="signupForm space-y-6">
            <img src={logo} className="mx-auto mb-6" alt="Logo" />
            <h1 className="text-3xl font-bold mb-4">Create an Account</h1>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                className="w-full py-3 px-4 border border-gray-300 rounded-lg"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full py-3 px-4 border border-gray-300 rounded-lg"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full py-3 px-4 border border-gray-300 rounded-lg"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full py-3 px-4 border border-gray-300 rounded-lg"
              />
              <div className="text-lg">
                Already have an account? <a href="#">Sign In</a>
              </div>
              <button className="bg-black text-white py-2 px-6 rounded-full w-full mt-4">
                Sign Up
              </button>
            </form>
            <h5 className="text-sm mt-4">
              By signing up, you agree to our <a href="#">Terms of Service</a>{" "}
              and <a href="#">Privacy Policy</a>
            </h5>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
