import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

import OAuth from "components/OAuth";

import signInImg from "assets/svg/undraw_login.svg";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        navigate("/");
      }
    } catch (error) {
      toast.error("Bad user credentials.");
    }
  };

  return (
    <section>
      <h1 className="section-heading">Sign In</h1>
      <div className="signin-wrapper">
        <div className="signin-img-wrapper">
          <img src={signInImg} alt="key" className="w-full rounded-2xl" />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleChange}
              placeholder="Email"
              className="mb-6 signin-input"
            />
            <div className="relative mb-6">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={handleChange}
                placeholder="Password"
                className="signin-input"
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  className=""
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              ) : (
                <AiFillEye
                  className="password-icon"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              )}
            </div>
            <div className="global-text-wrapper">
              <p className="mb-6">
                Don't have an account?
                <Link to="/sign-up" className="signin-link-1">
                  Sign Up
                </Link>
              </p>
              <p>
                <Link to="/forgot-password" className="signin-link-2">
                  Forgot password?
                </Link>
              </p>
            </div>
            <button className="signin-button" type="submit">
              Sign in
            </button>
            <div className="signin-or-wrapper">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
}
