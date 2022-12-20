
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { HomePage } from "./pages/Home"; 
import { AddNurse } from './pages/Add';
import { EditNurse } from './pages/Edit';

import { getNurseData } from "./service/NurseService";

import { NurseInfo } from "./components/NurseInfo";



function App() {
  // let [nurseData, setNurseData] = useState([])
  // console.log(nurseData)

  //  Fetch data from an API
  // const fetchData = useCallback(()=>{
  //   fetch('./data.json')
  //   .then(response => response.json())
  //   .then((data) => setNurseData(data))
  // },[])

  //Fetch data from Api
  // useEffect(() => {
  //   getNurseData()
  //   .then((data) => setNurseData(data))
  // }, [nurseData]) 


  return (
    <BrowserRouter >
    <div className="App">
      <h1 className="text-center">Hospital</h1>
      

      <Routes> 
          <Route path= '/' element={<HomePage />} />
          <Route path= '/add' element={<AddNurse />} />
          <Route path= '/edit' element={<EditNurse />} />
          
      </Routes>
      
      
    </div>
    </BrowserRouter>
  );
}

export default App;
