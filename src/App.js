// import logo from "./logo.svg";
// import './App.css';
// import { RouteSharp } from "@mui/icons-material";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import DisplayAllTask from "./components/DisplayAllTask";
import AddTask from "./components/addtask";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<AddTask/>} path={'/addtask'}/>
          <Route element={<DisplayAllTask/>} path={'/displayalltask'}/>
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
