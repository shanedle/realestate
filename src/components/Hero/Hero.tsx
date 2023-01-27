import { Link } from "react-router-dom";

import heroImg from "assets/jpg/naomi-ellsworth-unsplash.jpg";

export const Hero = () => {
  return (
    <>
      <div className="mx-auto container px-6 xl:px-0 h-full">
        <div className="relative w-full lg:flex items-center justify-end">
          <div className="relative lg:flex items-center">
            <div className="w-full lg:w-1/2 py-12 xl:py-16 px-8 xl:px-16 bg-blue-700 text-white my-auto h-full flex flex-col justify-center lg:max-w-lg xl:max-w-2xl z-50">
              <h1 className="text-2xl lg:text-4xl xl:text-5xl leading-normal font-bold tracking-wide f-f-d-s">
                Own your dream house
              </h1>

              <p className="text-base lg:text-2xl font-normal tracking-tight leading-7 py-8 f-f-l">
                Owning a home is a keystone of wealth, both financial affluence
                and emotional security.
              </p>

              <Link to="/category/sale">
                <button className="px-4 lg:px-10 py-4 bg-blue-800 hover:bg-blue-900 lg:text-2xl uppercase font-bold f-f-l">
                  Explore
                </button>
              </Link>
            </div>

            <div className="w-full lg:w-1/2 relative">
              <img
                src={heroImg}
                alt="Hero House"
                className="w-full object-cover object-center relative z-10"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
