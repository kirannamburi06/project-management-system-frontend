import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Projects from "./pages/Projects";

function App(){

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </BrowserRouter>
  )

}

export default App