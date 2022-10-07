import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import OAuth from "../../components/OAuth";

import forgotPasswordImg from "../../assets/svg/undraw_forgot_password.svg";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  function onChange(e) {
    setEmail(e.target.value);
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("The email was sent.");
    } catch (error) {
      toast.error("Couldn't send the password reset.");
    }
  }

  return (
    <section>
      <h1 className="section-heading">Forgot Password</h1>
      <div className="signin-wrapper">
        <div className="signin-img-wrapper">
          <img
            src={forgotPasswordImg}
            alt="key"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={onSubmit}>
            <input
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Email address"
              className="mb-6 signin-input"
            />

            <div className="text-wrapper-1">
              <p className="mb-6">
                Don't have a account?
                <Link to="/sign-up" className="signin-link-1">
                  Register
                </Link>
              </p>
              <p>
                <Link to="/sign-in" className="signin-link-2">
                  Sign in instead
                </Link>
              </p>
            </div>
            <button className="signin-button" type="submit">
              Send reset password
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
