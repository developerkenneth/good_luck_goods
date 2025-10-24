import { FaStar } from "react-icons/fa";

export default function ProductRatingSummary({ comments = [] }) {
  if (comments.length === 0) {
    return (
      <div className="bg-white mb-6 dark:bg-gray-900 rounded-2xl p-6  text-center text-gray-500 dark:text-gray-400">
        <p>No ratings yet. Be the first to review this product!</p>
      </div>
    );
  }

  // Extract ratings
  const ratings = comments.map((c) => c.rating || 0);
  const totalReviews = ratings.length;
  const averageRating =
    ratings.reduce((sum, r) => sum + r, 0) / totalReviews;

  // Count each rating (1–5)
  const ratingCounts = [5, 4, 3, 2, 1].map(
    (star) => ratings.filter((r) => r === star).length
  );

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-md space-y-5 mb-6">
      {/* Average Rating Section */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
          Overall Rating
        </h3>

        <div className="flex items-center justify-center gap-2">
          <span className="text-4xl font-bold text-yellow-500">
            {averageRating.toFixed(1)}
          </span>
          <div className="flex">
            {Array.from({ length: 5 }, (_, i) => (
              <FaStar
                key={i}
                className={`${
                  i < Math.round(averageRating)
                    ? "text-yellow-400"
                    : "text-gray-300 dark:text-gray-600"
                } text-lg`}
              />
            ))}
          </div>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Based on {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
        </p>
      </div>

      {/* Rating Breakdown */}
      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((star, index) => {
          const count = ratingCounts[index];
          const percentage = (count / totalReviews) * 100 || 0;
          return (
            <div key={star} className="flex items-center gap-3">
              <div className="w-8 text-sm font-medium text-gray-700 dark:text-gray-300">
                {star}★
              </div>
              <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 transition-all"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <div className="w-10 text-sm text-gray-600 dark:text-gray-400 text-right">
                {count}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
