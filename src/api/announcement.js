export default async function fetchAnnouncement() {
  const url = `http://127.0.0.1:8000/api/announcement/latest`;
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
