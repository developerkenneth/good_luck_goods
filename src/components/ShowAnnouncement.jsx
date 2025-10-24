import React, { useState, useEffect } from "react";
import fetchAnnouncement from "../api/announcement";

const ShowAnnouncement = ({
  speed = 20, // in seconds
  bgColor = "bg-gray-900",
  textColor = "text-white"
}) => {
  const [visible, setVisible] = useState(true);
  const [announcement, setAnnouncement] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnnouncement() {
      try {
        const result = await fetchAnnouncement();
        setAnnouncement(result?.data);
      } catch (e) {
        console.error(e);
      }
      finally{
        setLoading(false);
      }
    }

    loadAnnouncement();
  }, []);

  // ✅ Conditional return AFTER all hooks
  if (!visible) return null;

  return (
    <div className={`${bgColor} relative overflow-hidden w-full py-2 pl-2 pr-8`}>
      <div
        className="whitespace-nowrap inline-block animate-[var(--animate-marquee)]"
        style={{ animationDuration: `${speed}s` }}
      >
        <span className={`${textColor} inline-block font-medium`}>
          { !loading && `🚀${announcement.message}🚀`}&nbsp;
          { !loading && `🚀${announcement.message}🚀`}&nbsp;
          { !loading && `🚀${announcement.message}🚀`}
        </span>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 text-xl hover:text-red-400 transition-colors"
      >
        ✕
      </button>
    </div>
  );
};

export default ShowAnnouncement;
