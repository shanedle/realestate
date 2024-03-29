import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
  where,
} from "firebase/firestore";

import { db } from "lib/firebase";

import Spinner from "components/Spinner";
import ListingItem from "components/ListingItem";

interface Listing {
  id: string;
  data: any;
}

export default function Category() {
  const [listings, setListings] = useState<Listing[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastFetchListing] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingRef = collection(db, "listings");
        const q = query(
          listingRef,
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc"),
          limit(8)
        );
        const querySnap = await getDocs(q);
        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchListing(lastVisible);
        const listings: Listing[] = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error("Couldn't fetch listing.");
      }
    };

    fetchListings();
  }, [params.categoryName]);

  const handleFetchMoreListings = async () => {
    try {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("type", "==", params.categoryName),
        orderBy("timestamp", "desc"),
        startAfter(lastFetchedListing),
        limit(4)
      );
      const querySnap = await getDocs(q);
      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchListing(lastVisible);
      const listings: Listing[] = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings((prevState) => [...prevState, ...listings]);
      setLoading(false);
    } catch (error) {
      toast.error("Couldn't fetch listing.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-3">
      <h1 className="section-heading mb-6">
        {params.categoryName === "rent"
          ? "Rental Listings"
          : "Real Estate & Houses For Sale"}
      </h1>
      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="home-listing-wrapper 2xl:grid-cols-5">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                />
              ))}
            </ul>
          </main>
          {lastFetchedListing && (
            <div className="flex justify-center items-center">
              <button
                onClick={handleFetchMoreListings}
                className="bg-white px-3 py-1.5 text-gray-700 border border-gray-300 mb-6 mt-6 hover:border-slate-600 rounded transition duration-150 ease-in-out"
              >
                Load more
              </button>
            </div>
          )}
        </>
      ) : (
        <p>
          There are no current{" "}
          {params.categoryName === "rent"
            ? "houses for rent"
            : "houses for sale"}
        </p>
      )}
    </div>
  );
}
