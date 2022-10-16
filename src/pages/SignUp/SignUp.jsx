import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { toast } from "react-toastify";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

import { db } from "services/firebase";

import OAuth from "components/OAuth";

import signInImg from "assets/svg/undraw_login.svg";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;
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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      updateProfile(auth.currentUser, {
        displayName: name,
      });
      const user = userCredential.user;
      const formDataCopy = { ...formData };

      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);
      toast.success("Sign up was successful.");
      navigate("/sign-in");
    } catch (error) {
      toast.error("Something went wrong with the registration.");
    }
  };

  return (
    <section>
      <h1 className="section-heading">Sign Up</h1>
      <div className="signin-wrapper">
        <div className="signin-img-wrapper">
          <img src={signInImg} alt="key" className="w-full rounded-2xl" />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleChange}
              placeholder="Full name"
              className="mb-6 signin-input"
            />
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleChange}
              placeholder="Email address"
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
                  className="password-icon"
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
                Have a account?
                <Link to="/sign-in" className="signin-link-1">
                  Sign in
                </Link>
              </p>
              <p>
                <Link to="/forgot-password" className="signin-link-2">
                  Forgot password?
                </Link>
              </p>
            </div>
            <button className="signin-button" type="submit">
              Sign up
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
