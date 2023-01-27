import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import { db } from "services/firebase";

import Hero from "components/Hero";
import ListingItem from "components/ListingItem";

interface Listing {
  id: string;
  data: any;
}

export default function Home() {
  // Houses for rent
  const [rentListings, setRentListings] = useState<Listing[] | null>(null);
  useEffect(() => {
    const fetchListings = async () => {
      try {
        // get the reference
        const listingsRef = collection(db, "listings");
        // create the query
        const q = query(
          listingsRef,
          where("type", "==", "rent"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        // execute the query
        const querySnap = await getDocs(q);
        const listings: Listing[] = [];

        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setRentListings(listings);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListings();
  }, []);

  // Houses for rent
  const [saleListings, setSaleListings] = useState<Listing[] | null>(null);
  useEffect(() => {
    const fetchListings = async () => {
      try {
        // get the reference
        const listingsRef = collection(db, "listings");
        // create the query
        const q = query(
          listingsRef,
          where("type", "==", "sale"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        // execute the query
        const querySnap = await getDocs(q);
        const listings: Listing[] = [];

        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setSaleListings(listings);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListings();
  }, []);

  return (
    <div>
      <Hero />

      <div className="max-w-6xl mx-auto pt-4 space-y-6">
        {rentListings && rentListings.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="home-heading-2">Houses for rent</h2>
            <Link to="/category/rent">
              <p className="home-show-more-text">View all houses for rent</p>
            </Link>
            <ul className="home-listing-wrapper">
              {rentListings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="home-heading-2">Houses for sale</h2>
            <Link to="/category/sale">
              <p className="home-show-more-text">View all houses for sale</p>
            </Link>
            <ul className="home-listing-wrapper">
              {saleListings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
