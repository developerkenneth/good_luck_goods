import { useEffect, useState } from "react";
import CommentList from "./CommentList";
import AddCommentForm from "./AddCommentForm";
import { fetchCommentsByProduct } from "../api/comments";
import ProductRatingSummary from "./ProductRatingSummary";

export default function CommentSection({ productId }) {
  // fetching comments from product Id

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadComments = async () => {
      setLoading(true);
      const fetchedComments = await fetchCommentsByProduct(productId);
      setComments(fetchedComments);
      setLoading(false);
    };

    if (productId) loadComments();
  }, [productId]);

  const [showForm, setShowForm] = useState(false);

  return (
    <div className="mt-10  dark:bg-gray-800 p-6 lg:px-10 rounded-2xl">
    

      {loading ? (
        <p className="text-gray-500 italic">Loading comments...</p>
      ) : (
        <>
        <ProductRatingSummary comments={comments} />
        <CommentList comments={comments} />
        </>
      )}

      {/* Toggle button */}
      {!showForm && (
        <div className="text-center mt-4">
          <button
            onClick={() => setShowForm(true)}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition"
          >
            💬 Write a Comment
          </button>
        </div>
      )}

      {/* Add Comment Form */}
      {showForm && (
        <div className="mt-6 border-t border-gray-300 dark:border-gray-700 pt-4">
          <AddCommentForm productId={productId} />

          {/* Cancel button */}
          <button
            onClick={() => setShowForm(false)}
            className="mt-3 text-sm text-gray-600 dark:text-gray-300 hover:text-red-500 transition"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
