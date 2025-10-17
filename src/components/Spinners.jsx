import { ClipLoader } from "react-spinners";


const override = {
    display: 'block',
    margin: '100px auto'
}
function Spinners({loading}) {
  return <ClipLoader 
  cssOverride={override}
   color="#fd2d61"
   size={150}
   loading={loading}
    />;
}

export default Spinners ;