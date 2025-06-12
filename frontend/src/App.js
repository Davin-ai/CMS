import { useRoutes } from 'react-router-dom';
import './App.css';
import Header from "./Component/Header/Header";
import Sidebar from "./Component/Sidebar/Sidebar";
import routes from './routes';


function App() {

  const router = useRoutes (routes)

  return (<>
  <Sidebar/>

  <div className="main">
    <Header/>

    {router}
    
  </div>
  </>
  );
}

export default App;
