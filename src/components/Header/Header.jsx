import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Header() {
  const [header, setHeader] = useState(false);
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
    <nav className="w-full bg-white shadow">
      <div className="justify-between px-4 mx-auto lg:max-w-6xl md:items-center md:flex">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <div className="cursor-pointer" onClick={() => navigate("/")}>
              <h2 className="text-2xl font-bold text-blue-500">RealEstate</h2>
            </div>
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setHeader(!header)}
              >
                {header ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              header ? "block" : "hidden"
            }`}
          >
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              <li
                className={`header-link ${pathMatchRoute("/") && "text-black"}`}
                onClick={() => navigate("/")}
              >
                Home
              </li>
              <li
                className={`header-link ${
                  pathMatchRoute("/offers") && "text-black"
                }`}
                onClick={() => navigate("/offers")}
              >
                Offers
              </li>
              <li
                className={`header-link ${
                  pathMatchRoute("/category/sale") && "text-black "
                }`}
                onClick={() => navigate("/category/sale")}
              >
                Buy
              </li>
              <li
                className={`header-link ${
                  pathMatchRoute("/category/rent") && "text-black"
                }`}
                onClick={() => navigate("/category/rent")}
              >
                Rent
              </li>
            </ul>

            <div className="mt-3 space-y-2 lg:hidden md:inline-block">
              <div
                className={`header-link ${
                  (pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) &&
                  "text-black"
                }`}
                onClick={() => navigate("/profile")}
              >
                {pageState}
              </div>
            </div>
          </div>
        </div>
        <div className="hidden space-x-2 md:inline-block">
          <div
            className={`header-link ${
              (pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) &&
              "text-black"
            }`}
            onClick={() => navigate("/profile")}
          >
            {pageState}
          </div>
        </div>
      </div>
    </nav>
  );
}
