
export async function fetchCommentsByProduct(productId) {
  try {
    const res = await fetch(`https://admin.shop.goodlucks.co/api/comments/product/${productId}`);
    if (!res.ok) throw new Error("Failed to fetch comments");
    const data = await res.json();
    return data.comments || data; // Adjust based on your API response
  } catch (error) {
    console.error("Error loading comments:", error);
    return [];
  }
}

export async function postComments(data) {
  const url = "https://admin.shop.goodlucks.co/api/comments";
  try {
    const res = await fetch(url, {
      method: "POST",
      body: data, // 👈 no headers — browser sets multipart automatically
    });

    const result = await res.json();
    return result;
  } catch (e) {
    console.error("Error posting comment:", e);
    return { success: false, message: e.message };
  }
}

