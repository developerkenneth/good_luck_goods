import React from "react";

export default function CommentList({ comments }) {
  const maskPhone = (phone) =>
    phone?.replace(/(\d{4})\d{4}(\d{3,})/, "$1****$2") || "Unknown";

  return (
    <div className="relative w-full overflow-hidden border border-gray-200 dark:border-gray-600 rounded-lg mb-6 bg-white dark:bg-gray-800">
      {/* Desktop: Marquee layout */}
      <div className="hidden sm:flex items-stretch animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="flex-shrink-0 w-[320px] mx-3 bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-600 flex gap-4 items-start"
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                <svg
                  className="w-10 h-10 text-gray-400 dark:text-gray-300 rounded-full bg-gray-100 dark:bg-gray-600 p-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zM12 14.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              </div>

              {/* Comment Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    {comment.name.toUpperCase()}
                  </p>
                  {/* Verified Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-pink-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414L9 13.414l4.707-4.707z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400">
                  📞 {maskPhone(comment.phone)}
                </p>

                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  {comment.comment}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic text-center w-full py-4">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>

      {/* Mobile: Normal stacked layout */}
      <div className="flex flex-col sm:hidden space-y-3 p-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-600 flex gap-3 items-start"
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                <svg
                  className="w-8 h-8 text-gray-400 dark:text-gray-300 rounded-full bg-gray-100 dark:bg-gray-600 p-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zM12 14.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              </div>

              {/* Comment content */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    {comment.name.toUpperCase()}
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-pink-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414L9 13.414l4.707-4.707z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400">
                  📞 {maskPhone(comment.phone)}
                </p>

                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  {comment.text}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic text-center">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
}
