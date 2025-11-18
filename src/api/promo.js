export async function fetchPromo(){
  const url = `https://admin.shop.goodlucks.co/api/latest-ad`;
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