import React, { useState } from "react";
import toast from "react-hot-toast";
import { postComments } from "../api/comments";

export default function AddCommentForm({ productId }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  const  handleSubmit = async (e) => {

    setLoading(true);

    e.preventDefault();
    if (!newComment.trim() || !name.trim() || !phone.trim()) return;

    const data = {

      product_id: productId,
      name : name,
      phone : phone,
      comment : newComment
      
    }
    
    // call the post comments 
    const result = await postComments(data);
    if(result.success){
      toast.success(result.message);
    }else{
      toast.error("Failed to send comments, please try again.")
    }
    
    //set loading to false;
    setLoading(false);

    //empty the input field
    setName("");
    setNewComment("");
    setPhone("");
   
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 mt-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
    >
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        required
      />

      <input
        type="tel"
        placeholder="Your phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        pattern="[0-9]{11}"
        title="Enter a valid 11-digit phone number"
        required
      />

      <textarea
        rows="3"
        placeholder="Write a comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        required
      ></textarea>

      
      <button
        type="submit"
        disabled={loading}
        className={`bg-primary text-white px-4 py-2 rounded-lg w-full transition flex items-center justify-center gap-2 ${
          loading
            ? "opacity-70 cursor-not-allowed"
            : "hover:bg-pink-600"
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
