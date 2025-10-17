export async function fetchPromo(){
  const url = `http://127.0.0.1:8000/api/latest-ad`;
  try {
      const res = await fetch(url);
      if(!res.ok) throw new Error(`Oops something when wrong. Status:${res.status}`);
      const result = await res.json();
      return result;
  }catch(e){
      console.Error(e);
      return {} ;
  }
  
}