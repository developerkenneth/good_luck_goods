import React, { useState } from "react";

export default function CommentList({ comments = [] }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const BASE_URL = "https://admin.shop.goodlucks.co/storage/"; // 👈 Laravel public storage base URL

  const maskPhone = (phone) =>
    phone?.replace(/(\d{4})\d{4}(\d{3,})/, "$1****$2") || "Unknown";

  const formatDate = (date) => {
    if (!date) return "Unknown date";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const renderStars = (rating = 0) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={i <= rating ? "currentColor" : "none"}
          stroke="currentColor"
          className="w-4 h-4 text-primary"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.166c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.785.57-1.84-.197-1.54-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.06 9.384c-.783-.57-.38-1.81.588-1.81h4.166a1 1 0 00.95-.69l1.285-3.957z"
          />
        </svg>
      );
    }
    return <div className="flex items-center gap-1">{stars}</div>;
  };

  // Safely get photo URLs (from Laravel JSON field)
  const getPhotoUrls = (comment) => {
    if (!comment.photos) return [];

    try {
      const parsed = Array.isArray(comment.photos)
        ? comment.photos
        : JSON.parse(comment.photos);

      return parsed.map((photo) =>
        photo.startsWith("http")
          ? photo
          : `${BASE_URL}${photo.replace(/^\/+/, "")}`
      );
    } catch {
      return [];
    }
  };

  return (
    <div className="w-full  rounded-lg mb-6 bg-white dark:bg-gray-900 ">
      <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100 m-4">
        Customer Comments
      </h3>

      {comments.length > 0 ? (
        <div className="flex flex-col space-y-4">
          {comments.map((comment) => {
            const photos = getPhotoUrls(comment);

            return (
              <div
                key={comment.id}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all"
              >
                {/* Date + Rating */}
                <div className="flex items-center justify-between mb-6">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(comment.created_at || comment.date)}
                  </p>
                  {comment.rating && (
                    <div className="flex items-center text-primary">
                      {renderStars(comment.rating)}
                    </div>
                  )}
                </div>

                {/* Name and phone */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-shrink-0">
                    <svg
                      className="w-10 h-10 text-gray-400 dark:text-gray-300 rounded-full bg-gray-100 dark:bg-gray-600 p-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zM12 14.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                    </svg>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-800 dark:text-gray-200">
                        {comment.name?.toUpperCase() || "Anonymous"}
                      </p>
                      {comment.verified && (
                        <div className="relative group">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 text-primary cursor-pointer"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414L9 13.414l4.707-4.707z"
                              clipRule="evenodd"
                            />
                          </svg>

                          {/* Tooltip */}
                          <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-1 text-xs font-medium text-white bg-gray-900 rounded-md opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-1 transition-all duration-300 whitespace-nowrap">
                            ✅ Verified Buyer (No Filter)
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      📞 {maskPhone(comment.phone)}
                    </p>
                  </div>
                </div>

                {/* Comment text */}
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  {comment.comment || comment.text}
                </p>

                {/* Comment photos */}
                {photos.length > 0 && (
                  <div className="">
                    <div className="flex gap-3 flex-wrap mb-3 border-t border-gray-200 pt-6">
                      {photos.slice(0, 6).map((src, index) => (
                        <img
                          key={index}
                          src={src}
                          alt={`Comment photo ${index + 1}`}
                          className="w-24 h-24 object-cover rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer hover:opacity-80 transition"
                          onClick={() => setSelectedImage(src)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Verified status */}
                <p className="text-xs text-gray-400 italic mt-3">
                  ✅ Verified by admin
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 italic text-center py-6">
          No comments yet. Be the first to comment!
        </p>
      )}

      {/* Full Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Full view"
            className="max-w-full max-h-[90vh] rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
}
