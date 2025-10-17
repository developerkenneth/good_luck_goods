import React, { useEffect, useState } from "react";
import PromoPopup from "../components/PromoPopup";
import { fetchPromo } from "../api/promo";

export default function PromoContainer() {
  const [adData, setAdData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch ad data from API
  useEffect(() => {
    async function fetchAd() {
      try {
        const data = await fetchPromo();
        setAdData(data?.data);
      } catch (err) {
        console.error("Error fetching ad:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAd();
  }, []);

  // Custom ad content to inject into AdPopup
  const adContent = adData ? (
    <div className="flex flex-col md:flex-row gap-4 items-center">
      <div className="w-full md:w-44 h-44 md:h-36 rounded-lg overflow-hidden shadow-inner">
        <img
          src={adData.image || "https://via.placeholder.com/150"}
          alt={adData.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
          {adData.title || "Amazing Offer!"}
        </h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          {adData.description || "Check out our latest promotion!"}
        </p>

        <div className="mt-4 flex items-center gap-3">
          <a
            href={adData.link || "/shop"}
            className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md text-sm shadow"
          >
            {adData.buttonText || "Shop Now"}
          </a>
          <button
            onClick={() => console.log("User closed ad")}
            className="text-sm text-gray-600 dark:text-gray-300 underline"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      {!loading && (
        <PromoPopup
          adContent={adContent}
          interval={1000 * 60 * 5} // show every 15 seconds
          initialDelay={5000} // first popup after 5 seconds
        />
      )}
    </>
  );
}
