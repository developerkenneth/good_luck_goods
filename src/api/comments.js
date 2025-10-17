
export async function fetchCommentsByProduct(productId) {
  try {
    const res = await fetch(`http://localhost:8000/api/comments/product/${productId}`);
    if (!res.ok) throw new Error("Failed to fetch comments");
    const data = await res.json();
    return data.comments || data; // Adjust based on your API response
  } catch (error) {
    console.error("Error loading comments:", error);
    return [];
  }
}

export async function postComments(data){
  const url = "http://localhost:8000/api/comments/";
  try{
      
      const res = await fetch(url, {
        method: "POST",
        headers : {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if(!res.ok) throw new Error(`An error occured: ${res.status}`);

      const result = await res.json();
      return result ;

  }catch(e){

    console.error(e);
    return [];
    
  }
}
