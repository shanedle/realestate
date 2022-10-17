import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Header() {
  const [pageState, setPageState] = useState("Sign in");

  const location = useLocation();
  const navigate = useNavigate();

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState("Profile");
      } else {
        setPageState("Sign in");
      }
    });
  }, [auth]);

  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };

  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-40">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div className="h-5 cursor-pointer" onClick={() => navigate("/")}>
          <span className="font-bold text-blue-800 text-lg text-uppercase">
            RealEstate
          </span>
        </div>
        <div>
          <ul className="flex space-x-10">
            <li
              className={`header-link ${
                pathMatchRoute("/") && "text-black border-b-blue-500"
              }`}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className={`header-link ${
                pathMatchRoute("/offers") && "text-black border-b-blue-500"
              }`}
              onClick={() => navigate("/offers")}
            >
              Offers
            </li>
            <li
              className={`header-link ${
                pathMatchRoute("/category/sale") &&
                "text-black border-b-blue-500"
              }`}
              onClick={() => navigate("/category/sale")}
            >
              Buy
            </li>
            <li
              className={`header-link ${
                pathMatchRoute("/category/rent") &&
                "text-black border-b-blue-500"
              }`}
              onClick={() => navigate("/category/rent")}
            >
              Rent
            </li>
            <li
              className={`header-link ${
                (pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) &&
                "text-black border-b-blue-500"
              }`}
              onClick={() => navigate("/profile")}
            >
              {pageState}
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
