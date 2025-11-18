export default async function fetchProducts() {
  const url = `https://admin.shop.goodlucks.co/api/products`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error found: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}
