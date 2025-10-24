async function fetchCategories() {
  const url = `https://goodlucks.emethsoftwares.com.ng/api/categories`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error code: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
  }
}

export default fetchCategories;
