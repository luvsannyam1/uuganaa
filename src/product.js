// import React, {useState, useEffect} from "react";
// import axios from "axios";

// function Product() {
//     const [bus, setBus] = useState([])

//     useEffect(() =>{
//         // let isMounted = true;
//         axios.get('http://188.166.176.19:6062/v1/geofences')
//         .then(res => {
//             console.log(res)
//             setBus(res.data)
//         })
//         .catch(err => {
//             console.log(err)
//         })
//     })

//     return(
//         <div>
//             <ul>
//                 {
//                     bus.map((idx, key) => {
//                         return(
//                             <div key={key}>
//                                 <h1>{idx.name}</h1>
//                             </div>
//                         )
//                     })
//                 }
//             </ul>
//         </div>
//     )
// }

// export default Product