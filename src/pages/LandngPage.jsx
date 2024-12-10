import { useNavigate } from "react-router-dom";
import image1 from "../assets/images/img1.png";
import image2 from "../assets/images/img2.png";
import art25 from "../assets/images/art25.jpg";
import art21 from "../assets/images/art21.png";
import art19 from "../assets/images/art19.png";
import img1 from "../assets/images/img1.png";
import img2 from "../assets/images/img2.png";
import img3 from "../assets/images/img3.png";
import art7 from "../assets/images/art7.jpg";
import art2 from "../assets/images/art2.jpg";
import logo from "../assets/images/museo.png";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen overflow-y-scroll scroll-smooth snap-mandatory snap-y">
      <div className="fixed top-0 z-50 flex items-center justify-between w-full px-5 bg-white shadow-lg navbar h-30">
        <div className="title">
          <img className="w-52 p-4" src={logo} alt="Logo" />
        </div>
        <ul className="flex space-x-10 text-2xl font-semibold">
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
          className="px-6 py-2 text-white bg-black rounded-full"
          onClick={() => navigate("/signin")}
        >
          Sign In
        </button>
      </div>

      <section className="flex flex-col items-center justify-between h-screen px-5 mt-24 md:flex-row md:px-20 snap-start">
        <div className="text-left md:w-1/2">
          <h1 className="mb-4 text-5xl font-bold leading-tight">
            Imagination ignites, <br /> Artistry ignites.
          </h1>
          <p className="mb-6 text-xl font-light md:mr-32">
            Muzeum is a modern web application designed to serve as an
            art-related open platform for artists to showcase and share their
            artwork publicly. Whether you&apos;re a newbie or experienced
            artist, this community platform will inspire and connect you with
            other creatives.
          </p>
          <button
            className="px-6 py-2 text-white bg-black rounded-full"
            onClick={() => navigate("/signin")}
          >
            Explore
          </button>
        </div>
        <div className="flex flex-row items-center mt-10 lex first-line:md:items-end md:w-1/2 md:mt-0">
          <img
            src={image2}
            className="transform shadow-lg mt-45 bomb-4 rounded-2xl -rotate-12 md:w-96"
            alt="Artwork 2"
          />
          <img
            src={image1}
            className=" transform skew-x-[-10deg] md:w-96 shadow-lg rounded-2xl "
            alt="Artwork 1"
          />
        </div>
      </section>

      <section className="snap-start bg-[#A272BE] text-white flex items-center justify-center h-screen px-5 md:px-20">
        <div className="text-center md:w-1/2">
          <h5 className="mb-6 text-4xl font-bold uppercase">
            Create Your Own Art
          </h5>
          <div className="flex justify-center mb-6 space-x-4">
            <img src={art25} className="w-48 h-48 rounded-2xl" alt="Art 1" />
            <img src={art21} className="w-36 h-36" alt="Art 2" />
            <img src={art7} className="w-48 h-72 rounded-2xl" alt="Art 4" />
            <img src={art19} className="w-36 h-36" alt="Art 3" />
            <img src={art2} className="w-56 h-56 rounded-2xl" alt="Art 5" />
          </div>
          <button
            className="px-6 py-2 text-white bg-black rounded-full"
            onClick={() => navigate("/signup")}
          >
            Explore
          </button>
        </div>
      </section>

      <section className="flex items-center justify-center h-screen px-5 snap-start">
        <div className="w-full text-center md:w-1/2">
          <h5 className="mb-6 text-3xl font-bold">
            Share for Your Inspiration Art
          </h5>
          <div className="flex justify-center mb-6 space-x-4">
            <img
              src={img2}
              className="w-60 shadow-md rounded-2xl h-50"
              alt="Share Art 1"
            />
            <img
              src={img1}
              className="w-60 shadow-md rounded-2xl h-50"
              alt="Share Art 2"
            />
            <img
              src={img3}
              className="w-60 shadow-md rounded-2xl h-50"
              alt="Share Art 3"
            />
          </div>
          <button className="px-6 py-2 text-white bg-black rounded-full" onClick={() => navigate("/signup")}>
            Explore
          </button>
        </div>
      </section>

      <section className="flex items-center justify-center h-screen px-5 bg-gray-100 snap-start snap-always">
        <div className="w-full text-center md:w-1/2">
          <h1 className="mb-4 text-5xl font-bold">
            Sign Up for More Inspirational Arts
          </h1>
          <div className="space-y-6 signupForm">
            <img src={logo} className="mx-auto mb-6" alt="Logo" />
            <h1 className="mb-4 text-3xl font-bold">Create an Account</h1>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                disabled={true}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
              <input
                type="email"
                placeholder="Email"
                disabled={true}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
              <input
                type="password"
                placeholder="Password"
                disabled={true}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                disabled={true}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
              <button onClick={() => navigate("/signin")}>
                <div className="text-lg">
                  Already have an account? <a href="#">Sign In</a>
                </div>
              </button>
              <button
                className="w-full px-6 py-2 mt-4 text-white bg-black rounded-full"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </form>
            <h5 className="mt-4 text-sm">
              By signing up, you agree to our <a href="#">Terms of Service</a>{" "}
              and <a href="#">Privacy Policy</a>
            </h5>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
