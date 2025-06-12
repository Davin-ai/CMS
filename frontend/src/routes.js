import Product from "./Component/Product/Product";
import Comments from "./Component/Comments/Comments";
import Users from "./Component/Users/Users";
import Orders from "./Component/Orders/Orders";
import Ofers from "./Component/Ofers/Ofers";


const routes = [
    {path:'/prouduct', element:<Product/>},
    {path:'/comments', element:<Comments/>},
    {path:'/users', element:<Users/>},
    {path:'/orders', element:<Orders/>},
    {path:'/ofers', element:<Ofers/>}
]


export default routes