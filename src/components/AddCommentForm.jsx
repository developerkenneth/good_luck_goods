import React, { useState } from "react";
import toast from "react-hot-toast";
import { postComments } from "../api/comments";

export default function AddCommentForm({ productId }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle multiple image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const total = images.length + files.length;

    if (total > 6) {
      toast.error("You can upload a maximum of 6 images.");
      return;
    }

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...files]);
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  // Remove individual image
  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newComment.trim() || !name.trim() || !phone.trim()) {
      toast.error("Please fill all required fields.");
      return;
    }

    setLoading(true);

    // Build FormData for Laravel controller
    const formData = new FormData();
    formData.append("product_id", productId);
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("comment", newComment);
    formData.append("rating", rating);

    images.forEach((img) => {
      formData.append("photos[]", img); // 👈 Laravel expects "photos[]"
    });

    const result = await postComments(formData);

    if (result.success) {
      toast.success(result.message || "Comment submitted successfully!");
      setName("");
      setPhone("");
      setNewComment("");
      setRating(0);
      setImages([]);
      setPreviews([]);
    } else {
      toast.error(result.message || "Failed to post comment.");
    }

    setLoading(false);
  };

  // Render stars
  const renderStars = () => {
    return [...Array(5)].map((_, i) => (
      <button
        type="button"
        key={i}
        onClick={() => setRating(i + 1)}
        className={`text-2xl transition ${
          i + 1 <= rating ? "text-primary" : "text-gray-400"
        }`}
      >
        ★
      </button>
    ));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 mt-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transition"
    >
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        Leave a Comment
      </h3>

      {/* Name */}
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-900 dark:text-white"
        required
      />

      {/* Phone */}
      <input
        type="tel"
        placeholder="Your phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-900 dark:text-white"
        pattern="[0-9]{10}"
        title="Enter a valid 10-digit phone number"
        required
      />

      {/* Rating */}
      <div>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
          Your Rating:
        </p>
        <div className="flex items-center gap-1">{renderStars()}</div>
      </div>

      {/* Comment */}
      <textarea
        rows="4"
        placeholder="Write your comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-900 dark:text-white"
        required
      ></textarea>

      {/* Image Upload */}
      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center transition hover:bg-gray-50 dark:hover:bg-gray-700">
        <label className="block cursor-pointer">
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImageChange}
          />
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7m-8 4l4 4m0 0l-4-4m4 4V3m0 8l-4-4"
              />
            </svg>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Click to upload up to 6 images
            </p>
          </div>
        </label>

        {/* Image Previews */}
        {previews.length > 0 && (
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {previews.map((src, index) => (
              <div
                key={index}
                className="relative w-24 h-24 border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden"
              >
                <img
                  src={src}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-black bg-opacity-60 text-white rounded-full p-1 hover:bg-opacity-80"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className={`bg-primary text-white px-5 py-2 rounded-lg w-full transition flex items-center justify-center gap-2 ${
          loading ? "opacity-70 cursor-not-allowed" : "hover:bg-pink-600"
        }`}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            <span>Posting...</span>
          </>
        ) : (
          "Post Comment"
        )}
      </button>
    </form>
  );
}
