import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "components/Header";
import PrivateRoute from "components/PrivateRoute";

import Home from "pages/Home";
import Account from "pages/Account";
import SignIn from "pages/SignIn";
import SignUp from "pages/SignUp/SignUp";
import ForgotPassword from "pages/ForgotPassword";
import Category from "pages/Category";
import Listing from "pages/Listing";
import CreateListing from "pages/CreateListing";
import EditListing from "pages/EditListing";

export default function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<PrivateRoute />}>
            <Route path="/account" element={<Account />} />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/category/:categoryName/:listingId"
            element={<Listing />}
          />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="create-listing" element={<PrivateRoute />}>
            <Route path="/create-listing" element={<CreateListing />} />
          </Route>
          <Route path="edit-listing" element={<PrivateRoute />}>
            <Route path="/edit-listing/:listingId" element={<EditListing />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}
